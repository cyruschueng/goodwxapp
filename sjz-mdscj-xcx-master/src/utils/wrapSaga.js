export default function (fn) {
  const originFn = fn;
  
  fn = function *() {
    try {
    } catch (e) {
      if (e === 'RELOGIN') {
        originFn.apply(null, arguments);
      } else {
        throw e;
      }
    }  
  };
  
  return fn;
}
