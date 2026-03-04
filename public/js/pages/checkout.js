import { fetchBuild, checkout as checkoutApi, addComponent } from "../api.js";
import { BuildManager } from "../state/BuildManager.js";
import { updateNavbarCount } from "../ui.js";
import {
  RegularPricing,
  StudentDiscountPricing,
  FestivalPricing,
  UPIPayment,
  CardPayment,
  CODPayment
} from "../patterns/PricingStrategy.js";
import {
  BasePC,
  ExtendedWarranty,
  RGBLighting,
  ProfessionalAssembly
} from "../patterns/AddonsDecorator.js";
import { PCBuilder } from "../patterns/PCBuilder.js";

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

const pricingStrategies = {
  RegularPricing: new RegularPricing(),
  StudentDiscountPricing: new StudentDiscountPricing(),
  FestivalPricing: new FestivalPricing()
};

const paymentStrategies = {
  UPIPayment: new UPIPayment(),
  CardPayment: new CardPayment(),
  CODPayment: new CODPayment()
};

const buildPCConfiguration = (components) => {
  const builder = new PCBuilder();
  if (components.CPU) builder.setCPU(components.CPU);
  if (components.GPU) builder.setGPU(components.GPU);
  if (components.RAM) builder.setRAM(components.RAM);
  if (components.Motherboard) builder.setMotherboard(components.Motherboard);
  if (components.Storage) builder.setStorage(components.Storage);
  if (components.PSU) builder.setPSU(components.PSU);
  if (components.Cabinet) builder.setCabinet(components.Cabinet);
  return builder.build();
};

const buildAddonDecorators = (baseCost, selections) => {
  let pc = new BasePC(baseCost);
  if (selections.includes("ExtendedWarranty")) {
    pc = new ExtendedWarranty(pc);
  }
  if (selections.includes("RGBLighting")) {
    pc = new RGBLighting(pc);
  }
  if (selections.includes("ProfessionalAssembly")) {
    pc = new ProfessionalAssembly(pc);
  }
  return pc;
};

const renderSummary = (build) => {
  const list = document.querySelector("#checkout-summary");
  const items = Object.values(build.components || {});
  list.innerHTML = items
    .map((item) => `<li>${item.type}: ${item.name} - Rs. ${item.price}</li>`)
    .join("") || "<li>No components selected yet.</li>";

  document.querySelector("#base-total").textContent = `Rs. ${build.total}`;
};

const calculateTotals = () => {
  const build = buildManager.getBuild();
  const pricingKey = document.querySelector("#pricing").value;
  const selectedAddons = Array.from(
    document.querySelectorAll("input[name=addon]:checked")
  ).map((input) => input.value);

  const addonPC = buildAddonDecorators(build.total, selectedAddons);
  const pricedTotal = pricingStrategies[pricingKey].calculate(addonPC.getCost());

  document.querySelector("#final-total").textContent = `Rs. ${pricedTotal}`;
  document.querySelector("#addons-desc").textContent = addonPC.getDescription();

  return { pricedTotal, selectedAddons };
};

const init = async () => {
  await syncBuild();
  updateNavbarCount(buildManager.getBuild());

  renderSummary(buildManager.getBuild());
  calculateTotals();

  document.querySelectorAll("input[name=addon]").forEach((input) => {
    input.addEventListener("change", calculateTotals);
  });

  document.querySelector("#pricing").addEventListener("change", calculateTotals);

  document.querySelector("#checkout-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const pricing = document.querySelector("#pricing").value;
    const payment = document.querySelector("#payment").value;
    const { pricedTotal, selectedAddons } = calculateTotals();

    const configuration = buildPCConfiguration(buildManager.getBuild().components);
    const paymentMessage = paymentStrategies[payment].pay(pricedTotal);

    const response = await checkoutApi({
      pricing,
      payment,
      addons: selectedAddons,
      configuration
    });

    const result = document.querySelector("#checkout-result");
    result.classList.add("checkout-success");
    result.innerHTML = `
      <h3>Purchase Successful</h3>
      <p>${paymentMessage}</p>
      <p>Pricing applied: ${response.pricing}</p>
      <p>Add-ons: ${response.addons.join(", ") || "None"}</p>
      <p class="price">Final total: Rs. ${pricedTotal}</p>
    `;
  });
};

init();
