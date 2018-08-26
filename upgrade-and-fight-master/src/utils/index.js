function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}

export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join('/');
  const t2 = [hour, minute, second].map(formatNumber).join(':');

  return `${t1} ${t2}`;
}

export function debounce(fn, time) {
  let timer = null;
  return function () {
    console.log(arguments[0]);// eslint-disable-line
    clearTimeout(timer);
    // 这里使用function，在call方法的时候，fn函数内拿不到传入的参数，而箭头函数的时候则正常
    timer = setTimeout(() => {
      fn.call(null, arguments[0]); // eslint-disable-line
    }, time);
  };
}

export function throllte(fn, time, context) {
  let startTime = +new Date();
  return function () {
    let endTime = +new Date();  // eslint-disable-line
    if (endTime - startTime > time) {
      fn.apply(context, arguments); // eslint-disable-line
      startTime = endTime;
    }
  };
}

export default {
  formatNumber,
  formatTime,
  debounce,
  throllte,
};
