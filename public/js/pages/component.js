import {
  fetchComponents,
  fetchBuild,
  addComponent as apiAddComponent,
  removeComponent as apiRemoveComponent
} from "../api.js";
import { ComponentFactory } from "../patterns/ComponentFactory.js";
import { BuildManager } from "../state/BuildManager.js";
import { StepController } from "../state/StepController.js";
import { updateNavbarCount } from "../ui.js";

const buildManager = BuildManager.getInstance();

const steps = [
  {
    key: "CPU",
    label: "CPU",
    description: "Choose the processor that powers your build."
  },
  {
    key: "Motherboard",
    label: "Motherboard",
    description: "Pick the board that matches your CPU socket."
  },
  {
    key: "RAM",
    label: "RAM",
    description: "Select memory that fits the board and your workload."
  },
  {
    key: "GPU",
    label: "GPU",
    description: "Choose the graphics card for your performance needs."
  },
  {
    key: "Storage",
    label: "Storage",
    description: "Decide between fast NVMe or roomy HDD storage."
  },
  {
    key: "PSU",
    label: "PSU",
    description: "Select a power supply that can handle your GPU."
  },
  {
    key: "Cabinet",
    label: "Cabinet",
    description: "Pick a case that matches your style and size."
  },
  {
    key: "Review",
    label: "Review Build",
    description: "Review your full configuration before checkout."
  }
];

const stepController = new StepController(steps);
let componentsData = {};

const syncBuild = async () => {
  const serverBuild = await fetchBuild();
  const localBuild = buildManager.getBuild();
  const localItems = Object.values(localBuild.components || {});

  if (Object.keys(serverBuild.components || {}).length === 0 && localItems.length > 0) {
    for (const item of localItems) {
      await apiAddComponent(item.type, item.id);
    }
    const refreshed = await fetchBuild();
    buildManager.setBuild(refreshed);
  } else {
    buildManager.setBuild(serverBuild);
  }
};

const getFirstIncompleteIndex = (build) => {
  for (let index = 0; index < steps.length - 1; index += 1) {
    const key = steps[index].key;
    if (!build.components[key]) {
      return index;
    }
  }
  return steps.length - 1;
};

const renderStepper = () => {
  const stepper = document.querySelector("#stepper");
  stepper.innerHTML = steps
    .map(
      (step, index) => `
      <div class="step" data-step="${index}">
        <span class="step-circle"></span>
        <span class="step-label">${step.label}</span>
      </div>
    `
    )
    .join("");
};

const updateStepperState = (build) => {
  const stepElements = document.querySelectorAll(".step");
  stepElements.forEach((element) => {
    const index = Number(element.dataset.step);
    const step = steps[index];
    const isComplete = step.key !== "Review" && !!build.components[step.key];
    const isActive = index === stepController.getCurrentIndex();

    element.classList.toggle("active", isActive);
    element.classList.toggle("complete", isComplete);
  });
};

const clampScore = (value) => Math.max(0, Math.min(100, Math.round(value)));

const getScore = (price) => {
  if (!price) {
    return 0;
  }
  return clampScore((price / 15000) * 100);
};

const renderPerformance = (build) => {
  const cpuScore = getScore(build.components.CPU?.price);
  const gpuScore = getScore(build.components.GPU?.price);

  const gaming = clampScore(gpuScore * 0.7 + cpuScore * 0.3);
  const productivity = clampScore(cpuScore * 0.7 + gpuScore * 0.3);

  const gamingBar = document.querySelector("#perf-gaming");
  const productivityBar = document.querySelector("#perf-productivity");
  if (gamingBar) {
    gamingBar.style.width = `${gaming}%`;
  }
  if (productivityBar) {
    productivityBar.style.width = `${productivity}%`;
  }
};

const renderSummary = (build) => {
  const list = document.querySelector("#summary-list");
  const total = document.querySelector("#summary-total");

  const items = Object.values(build.components || {});
  list.innerHTML = items.length
    ? items
        .map(
          (item) => `
        <li class="summary-item">
          <span><span class="summary-icon">${item.type.slice(0, 3)}</span>${item.name}</span>
          <button type="button" data-remove="${item.type}">Remove</button>
        </li>
      `
        )
        .join("")
    : "<li class=\"muted\">No components selected yet.</li>";

  total.textContent = `Rs. ${build.total}`;
  renderPerformance(build);

  const removeButtons = list.querySelectorAll("button[data-remove]");
  removeButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const type = button.getAttribute("data-remove");
      buildManager.removeComponent(type);
      const serverBuild = await apiRemoveComponent(type);
      buildManager.setBuild(serverBuild);
      updateNavbarCount(buildManager.getBuild());
    });
  });
};

const renderReview = (build) => {
  const container = document.querySelector("#wizard-content");
  const items = Object.values(build.components || {});
  const listMarkup = items.length
    ? items
        .map((item) => `<li>${item.type}: ${item.name} - Rs. ${item.price}</li>`)
        .join("")
    : "<li>No components selected yet.</li>";

  container.innerHTML = `
    <div class="card review-card">
      <h3>Your Configuration</h3>
      <ul>${listMarkup}</ul>
      <p class="price">Total: Rs. ${build.total}</p>
      <div class="review-actions">
        <a class="btn ghost" href="build.html">Go to My Build</a>
        <a class="btn" href="checkout.html">Checkout</a>
      </div>
    </div>
  `;
};

const renderComponents = (build, type) => {
  const container = document.querySelector("#wizard-content");
  const list = componentsData[type] || [];
  const selected = build.components[type];

  container.innerHTML = list
    .map((item) => {
      const isSelected = selected && selected.id === item.id;
      return `
      <div class="card ${isSelected ? "selected" : ""}">
        <div class="card-media" data-type="${item.type}">
          <img src="${item.image}" alt="${item.name}" loading="lazy" />
        </div>
        <h3>${item.name}</h3>
        <p class="price">Rs. ${item.price}</p>
        <ul>
          ${Object.entries(item.specifications)
            .map(([key, value]) => `<li>${key}: ${value}</li>`)
            .join("")}
        </ul>
        <button class="btn ${isSelected ? "ghost" : ""}" data-id="${item.id}" data-type="${item.type}">
          ${isSelected ? "Selected" : "Select"}
        </button>
      </div>
    `;
    })
    .join("");
};

const updateControls = (build, step) => {
  const backButton = document.querySelector("#wizard-back");
  const nextButton = document.querySelector("#wizard-next");
  const hasSelection = step.key === "Review" || !!build.components[step.key];

  backButton.disabled = stepController.isFirst();
  nextButton.disabled = !hasSelection;
  nextButton.textContent = step.key === "Review" ? "Go to Build" : "Next";
};

const setLoading = () => {
  const content = document.querySelector("#wizard-content");
  if (!content) {
    return;
  }
  content.classList.add("loading");
  window.setTimeout(() => {
    content.classList.remove("loading");
  }, 250);
};

const renderCurrentStep = () => {
  const step = stepController.getCurrentStep();
  const build = buildManager.getBuild();

  setLoading();
  document.querySelector("#step-title").textContent = step.label;
  document.querySelector("#step-description").textContent = step.description;

  updateStepperState(build);
  updateControls(build, step);

  if (step.key === "Review") {
    renderReview(build);
  } else {
    renderComponents(build, step.key);
  }

  attachHandlers();
};

const attachHandlers = () => {
  const buttons = document.querySelectorAll("button[data-id]");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const id = button.getAttribute("data-id");
      const type = button.getAttribute("data-type");
      const data = componentsData[type].find((item) => item.id === id);
      const component = ComponentFactory.createComponent(type, data);

      buildManager.addComponent(component);
      const serverBuild = await apiAddComponent(type, id);
      buildManager.setBuild(serverBuild);
      updateNavbarCount(buildManager.getBuild());

      stepController.next();
      renderCurrentStep();
    });
  });
};

const init = async () => {
  await syncBuild();
  componentsData = await fetchComponents();
  stepController.setStep(getFirstIncompleteIndex(buildManager.getBuild()));
  renderStepper();
  updateNavbarCount(buildManager.getBuild());

  buildManager.subscribe(({ build }) => {
    renderSummary(build);
    updateStepperState(build);
    updateControls(build, stepController.getCurrentStep());
  });

  document.querySelector("#wizard-back").addEventListener("click", () => {
    stepController.back();
    renderCurrentStep();
  });

  document.querySelector("#wizard-next").addEventListener("click", () => {
    const step = stepController.getCurrentStep();
    if (step.key === "Review") {
      window.location.href = "build.html";
      return;
    }
    if (buildManager.getBuild().components[step.key]) {
      stepController.next();
      renderCurrentStep();
    }
  });

  renderSummary(buildManager.getBuild());
  renderCurrentStep();
};

init();
