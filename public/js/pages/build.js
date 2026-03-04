import { fetchBuild, removeComponent, addComponent } from "../api.js";
import { BuildManager } from "../state/BuildManager.js";
import { updateNavbarCount } from "../ui.js";

const buildManager = BuildManager.getInstance();

const syncBuild = async () => {
  const serverBuild = await fetchBuild();
  const localBuild = buildManager.getBuild();
  const localItems = Object.values(localBuild.components || {});

  if (Object.keys(serverBuild.components || {}).length === 0 && localItems.length > 0) {
    for (const item of localItems) {
      await addComponent(item.type, item.id);
    }
    const refreshed = await fetchBuild();
    buildManager.setBuild(refreshed);
  } else {
    buildManager.setBuild(serverBuild);
  }
};

const renderBuild = ({ build, warnings }) => {
  const container = document.querySelector("#build-list");
  const totalEl = document.querySelector("#total-price");
  const warningEl = document.querySelector("#compatibility-warnings");

  const components = Object.values(build.components || {});
  container.innerHTML = components
    .map(
      (item) => `
      <div class="card">
        <h3>${item.name}</h3>
        <p class="price">Rs. ${item.price}</p>
        <p class="muted">${item.type}</p>
        <button class="btn ghost" data-remove="${item.type}">Remove</button>
      </div>
    `
    )
    .join("");

  totalEl.textContent = `Rs. ${build.total}`;
  warningEl.innerHTML = warnings.length
    ? warnings.map((warning) => `<li>${warning}</li>`).join("")
    : "<li>No compatibility issues found.</li>";

  const removeButtons = document.querySelectorAll("button[data-remove]");
  removeButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const type = button.getAttribute("data-remove");
      buildManager.removeComponent(type);
      const serverBuild = await removeComponent(type);
      buildManager.setBuild(serverBuild);
      updateNavbarCount(buildManager.getBuild());
    });
  });
};

const init = async () => {
  await syncBuild();
  updateNavbarCount(buildManager.getBuild());

  buildManager.subscribe(renderBuild);
  buildManager.notify();
};

init();
