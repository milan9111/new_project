let debounceLastCall: number;
let lastCallTimer: NodeJS.Timeout;

export const debouncing = (callback: () => void, delay = 500) => {
  const prev = debounceLastCall;
  const last = Date.now();

  debounceLastCall = Date.now();

  if (prev !== undefined && last - prev <= delay) {
    clearTimeout(lastCallTimer);
  }

  lastCallTimer = setTimeout(() => {
    callback();
  }, delay);
};
