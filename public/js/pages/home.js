import { fetchBuild, fetchComponents, addComponent } from "../api.js";
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

const renderCategories = (componentsData) => {
  const container = document.querySelector("#category-list");
  const categories = Object.keys(componentsData);

  container.innerHTML = categories
    .map(
      (category) => `
      <a class="card" href="component.html?type=${category}">
        <h3>${category}</h3>
        <p>Select the best ${category} for your build.</p>
      </a>
    `
    )
    .join("");
};

const init = async () => {
  await syncBuild();
  const componentsData = await fetchComponents();
  renderCategories(componentsData);
  updateNavbarCount(buildManager.getBuild());
};

init();
