export class PCBuilder {
  constructor() {
    this.configuration = {
      CPU: null,
      GPU: null,
      RAM: null,
      Motherboard: null,
      Storage: null,
      PSU: null,
      Cabinet: null
    };
  }

  setCPU(cpu) {
    this.configuration.CPU = cpu;
    return this;
  }

  setGPU(gpu) {
    this.configuration.GPU = gpu;
    return this;
  }

  setRAM(ram) {
    this.configuration.RAM = ram;
    return this;
  }

  setMotherboard(motherboard) {
    this.configuration.Motherboard = motherboard;
    return this;
  }

  setStorage(storage) {
    this.configuration.Storage = storage;
    return this;
  }

  setPSU(psu) {
    this.configuration.PSU = psu;
    return this;
  }

  setCabinet(cabinet) {
    this.configuration.Cabinet = cabinet;
    return this;
  }

  build() {
    return { ...this.configuration };
  }
}
