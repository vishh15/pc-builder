export class RegularPricing {
  calculate(total) {
    return total;
  }
}

export class StudentDiscountPricing {
  calculate(total) {
    return Math.round(total * 0.9);
  }
}

export class FestivalPricing {
  calculate(total) {
    return Math.round(total * 0.85);
  }
}

export class UPIPayment {
  pay(amount) {
    return `UPI payment of Rs. ${amount} initiated`;
  }
}

export class CardPayment {
  pay(amount) {
    return `Card payment of Rs. ${amount} authorized`;
  }
}

export class CODPayment {
  pay(amount) {
    return `Cash on delivery scheduled for Rs. ${amount}`;
  }
}
