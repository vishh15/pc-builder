class BaseComponent {
  constructor({ id, type, name, price, specifications }) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.price = price;
    this.specifications = specifications;
  }

  getDetails() {
    return `${this.name} - Rs. ${this.price}`;
  }
}

class CPU extends BaseComponent {}
class GPU extends BaseComponent {}
class RAM extends BaseComponent {}
class Motherboard extends BaseComponent {}
class Storage extends BaseComponent {}
class PSU extends BaseComponent {}
class Cabinet extends BaseComponent {}

export class ComponentFactory {
  static createComponent(type, data) {
    switch (type) {
      case "CPU":
        return new CPU(data);
      case "GPU":
        return new GPU(data);
      case "RAM":
        return new RAM(data);
      case "Motherboard":
        return new Motherboard(data);
      case "Storage":
        return new Storage(data);
      case "PSU":
        return new PSU(data);
      case "Cabinet":
        return new Cabinet(data);
      default:
        throw new Error(`Unknown component type: ${type}`);
    }
  }
}
