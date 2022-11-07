const initCall = (num: number, timeout: number) =>
  new Promise(function (resolve, reject) {
    // do a thing, possibly async, then…
    setTimeout(() => {
      if (num === 0) {
        resolve("Stuff worked!");
      } else {
        reject(Error("It broke"));
      }
    }, timeout);
  });

export default initCall;
