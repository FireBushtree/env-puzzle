export const sleep = (time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
