module.exports = class SharedService {
  static asyncLoop(length, onIteration, onCompletion) {
    let index = -1;
    let done = false;
    let loop = {
      next: () => {
        if (done) return;
        if (index < length - 1) {
          index++;
          onIteration(loop);
        } else {
          done = true;
          if (onCompletion) {
            onCompletion("finish");
          }
        }
      },
      getIndex: () => {
        return index;
      },
      break: () => {
        done = true;
        if (onCompletion) {
          onCompletion("break");
        }
      },
    };
    loop.next();
  }
};
