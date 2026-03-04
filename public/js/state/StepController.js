export class StepController {
  constructor(steps) {
    this.steps = steps;
    this.currentIndex = 0;
  }

  setStep(index) {
    if (index < 0 || index >= this.steps.length) {
      return;
    }
    this.currentIndex = index;
  }

  getCurrentStep() {
    return this.steps[this.currentIndex];
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  isFirst() {
    return this.currentIndex === 0;
  }

  isLast() {
    return this.currentIndex === this.steps.length - 1;
  }

  next() {
    if (!this.isLast()) {
      this.currentIndex += 1;
    }
  }

  back() {
    if (!this.isFirst()) {
      this.currentIndex -= 1;
    }
  }
}
