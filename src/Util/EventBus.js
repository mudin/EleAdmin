const EventBus = {
  events: {},
  emit(event, ...args) {
    const Listeners = this.events[event];
    if (!Listeners) return;
    Listeners.forEach((e) => { e(...args); });
  },
  on(event, listener) {
    this.events = this.events || {};
    if (!this.events[event]) this.events[event] = [];
    this.events[event].push(listener);
  },
};

export default EventBus;
