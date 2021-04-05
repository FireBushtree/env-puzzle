export const sleep = (time: number) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });

export const mockLocationHref = (url) => {
  delete window.location;
  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    configurable: true,
    enumerable: true,
    value: {
      href: url,
    },
  });
};

export const mockLocalStorage = () => {
  const localStorageMock = (function() {
    let store = {};
    return {
      getItem: function(key) {
        return store[key];
      },
      setItem: function(key, value) {
        store[key] = value.toString();
      },
      clear: function() {
        store = {};
      },
      removeItem: function(key) {
        delete store[key];
      },
    };
  })();
  Object.defineProperty(window, 'localStorage', {value: localStorageMock});
};
