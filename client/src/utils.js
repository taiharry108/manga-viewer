export const loopWithDelay = (arr, delay, func, args) => {
  let ele = arr.shift();
  func(ele, args);
  setTimeout(() => {
    if (arr.length !== 0)
      loopWithDelay(arr, delay, func, args)
  }, delay);
}
