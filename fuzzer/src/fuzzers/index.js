let max = 1;

class RandomGenerator {
  constructor() {
    this.intCallCount = 0;
    this.intCurrentLength = 10;
    this.stringCallCount = 0;
    this.stringCurrentLength = 1;
  }

  randInt() {
    // increate call count
    this.intCallCount++;

    // increase length
    if (this.intCallCount % 31 == 0) {
      this.intCurrentLength++;
    }

    return Math.floor(Math.random() * (this.intCurrentLength - 0 + 1) + 0);
  }

  randString() {
    // increate call count
    this.stringCallCount++;

    // increase length
    if (this.stringCallCount % 31 == 0) {
      this.stringCurrentLength++;
    }

    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    const length = Math.floor(
      Math.random() * (this.stringCurrentLength - 0 + 1) + 0
    );

    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }

    return result;
  }

  randIntArr() {
    let result = [];
    const length = Math.floor(Math.random() * (100 - 0 + 1) + 0);

    for (let i = 0; i < length; i++) {
      result.push(this.randInt());
    }

    return result;
  }

  randStringArr() {
    let result = [];
    const length = Math.floor(Math.random() * (100 - 0 + 1) + 0);

    for (let i = 0; i < length; i++) {
      result.push(this.randString());
    }

    return result;
  }
}

module.exports = new RandomGenerator();
