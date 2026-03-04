export class CompatibilityChecker {
  static check(build) {
    const warnings = [];
    const cpu = build.components.CPU;
    const motherboard = build.components.Motherboard;
    const ram = build.components.RAM;
    const gpu = build.components.GPU;
    const psu = build.components.PSU;

    if (cpu && motherboard && cpu.specifications.socket !== motherboard.specifications.socket) {
      warnings.push("CPU socket does not match motherboard socket.");
    }

    if (ram && motherboard && ram.specifications.type !== motherboard.specifications.ramType) {
      warnings.push("RAM type does not match motherboard RAM support.");
    }

    if (gpu && psu && psu.specifications.wattage < gpu.specifications.powerRequirement) {
      warnings.push("PSU wattage is too low for the selected GPU.");
    }

    return warnings;
  }
}
