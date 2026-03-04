import { Observer } from "../patterns/Observer.js";
import { CompatibilityChecker } from "../patterns/CompatibilityChecker.js";

const STORAGE_KEY = "customPcBuild";
const STORAGE_VERSION_KEY = "customPcBuildVersion";
const STORAGE_VERSION = "prices-v3";

class BuildManagerSingleton {
  constructor() {
    this.observer = new Observer();
    this.build = {
      components: {},
      total: 0
    };
    this._loadFromStorage();
  }

  _loadFromStorage() {
    const saved = localStorage.getItem(STORAGE_KEY);
    const savedVersion = localStorage.getItem(STORAGE_VERSION_KEY);
    if (!saved) {
      return;
    }

    const parsed = JSON.parse(saved);
    const items = Object.values(parsed.components || {});
    const hasLegacyPrices = items.some((item) => typeof item.price === "number" && item.price < 1000);

    if (savedVersion !== STORAGE_VERSION || hasLegacyPrices) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
      return;
    }

    this.build = parsed;
  }

  _saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.build));
    localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
  }

  _recalcTotal() {
    const items = Object.values(this.build.components);
    this.build.total = items.reduce((sum, item) => sum + item.price, 0);
  }

  addComponent(component) {
    this.build.components[component.type] = component;
    this._recalcTotal();
    this._saveToStorage();
    this.notify();
  }

  removeComponent(type) {
    delete this.build.components[type];
    this._recalcTotal();
    this._saveToStorage();
    this.notify();
  }

  setBuild(build) {
    this.build = build;
    this._recalcTotal();
    this._saveToStorage();
    this.notify();
  }

  getBuild() {
    return this.build;
  }

  getWarnings() {
    return CompatibilityChecker.check(this.build);
  }

  subscribe(callback) {
    this.observer.subscribe(callback);
  }

  unsubscribe(callback) {
    this.observer.unsubscribe(callback);
  }

  notify() {
    this.observer.notify({ build: this.build, warnings: this.getWarnings() });
  }
}

let instance = null;

export class BuildManager {
  static getInstance() {
    if (!instance) {
      instance = new BuildManagerSingleton();
    }
    return instance;
  }
}
