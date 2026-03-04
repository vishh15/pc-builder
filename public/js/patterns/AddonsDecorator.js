class PCAddon {
  constructor(pc) {
    this.pc = pc;
  }

  getCost() {
    return 0;
  }

  getDescription() {
    return "Base PC";
  }
}

class AddonDecorator extends PCAddon {
  constructor(pc) {
    super(pc);
  }

  getCost() {
    return this.pc.getCost();
  }

  getDescription() {
    return this.pc.getDescription();
  }
}

export class BasePC extends PCAddon {
  constructor(baseCost) {
    super(null);
    this.baseCost = baseCost;
  }

  getCost() {
    return this.baseCost;
  }

  getDescription() {
    return "Custom PC";
  }
}

export class ExtendedWarranty extends AddonDecorator {
  getCost() {
    return this.pc.getCost() + 9000;
  }

  getDescription() {
    return `${this.pc.getDescription()}, Extended Warranty`;
  }
}

export class RGBLighting extends AddonDecorator {
  getCost() {
    return this.pc.getCost() + 4000;
  }

  getDescription() {
    return `${this.pc.getDescription()}, RGB Lighting`;
  }
}

export class ProfessionalAssembly extends AddonDecorator {
  getCost() {
    return this.pc.getCost() + 12000;
  }

  getDescription() {
    return `${this.pc.getDescription()}, Professional Assembly`;
  }
}
