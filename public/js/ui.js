export const updateNavbarCount = (build) => {
  const counter = document.querySelector("[data-build-count]");
  if (!counter) {
    return;
  }
  const count = Object.keys(build.components || {}).length;
  counter.textContent = count;
};
