export class Observer {
  constructor() {
    this.subscribers = new Set();
  }

  subscribe(callback) {
    this.subscribers.add(callback);
  }

  unsubscribe(callback) {
    this.subscribers.delete(callback);
  }

  notify(payload) {
    this.subscribers.forEach((callback) => callback(payload));
  }
}
