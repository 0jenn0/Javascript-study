class Observer {
  update(state) {
    throw new Error("Observer를 상속하여 update를 구현해 주세요.");
  }
}

class ConsoleLogger extends Observer {
  update(state) {
    console.log(JSON.stringify(state, null, 2));
  }
}

class Store {
  constructor(initialSate) {
    this.state = initialSate;
    this.observers = [];
  }

  notifyAll() {
    for (const observer of this.observers) {
      observer.update(this.state);
    }
  }

  subscribe(observer) {
    if (observer instanceof Observer) {
      this.observers.push(observer);
      return;
    }
    throw new Error("Observer의 인터페이스를 구현한 객체가 아닙니다.");
  }

  unsubscribe(observer) {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  setState(partialState) {
    this.state = { ...this.state, ...partialState };
    this.notifyAll();
  }

  getState() {
    return this.state;
  }

  increasement() {
    this.setState({ count: this.state.count + 1 });
  }

  decrement() {
    this.setState({ count: this.state.count - 1 });
  }
}

const store = new Store({ count: 0 });
const logger = new ConsoleLogger();
store.subscribe(logger);
store.increasement();
store.increasement();
store.increasement();
store.unsubscribe(logger);
store.increasement();
store.increasement();
