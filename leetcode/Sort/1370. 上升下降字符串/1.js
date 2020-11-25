/**
 *
 * thoughts:
 * sort + stack
 * O(n)
 * O(n)
 *
 * @param {string} s
 * @return {string}
 */
var sortString = function(s) {

  // 大的排前面
  let fromMinToMax = [];

  // 小的排前面
  let fromMaxToMin = [];

  let result = '';
  fromMinToMax = s.split("").map((str) => {
    return str.charCodeAt(0)
  }).sort((a, b) => {
    return b - a;
  });

  // true代表从小到大选择，false代表从大到小选择
  let dir = true;
  while(fromMinToMax.length || fromMaxToMin.length) {

    const min = dir ? fromMinToMax[fromMinToMax.length - 1] : fromMaxToMin[0];
    const max = dir ? fromMinToMax[0] : fromMaxToMin[fromMaxToMin.length - 1];

    let prev = -1;

    if(dir) { // 从小到大选择

      while(fromMinToMax.length) {

        const code = fromMinToMax.pop();

        if(prev === -1 || code > prev) { // 如果选择的code大于上一次选择的code，则加入到result
          result += String.fromCodePoint(code);
          prev = code;
        }else { // 如果不满足，则push到fromMaxToMin
          fromMaxToMin.push(code)
        }

        if(code === max) { // 如果pop的code已经到最大，则进入从大到小选择

          // 剩余元素push到fromMaxToMin
          while(fromMinToMax.length) {
            fromMaxToMin.push(fromMinToMax.pop());
          }
          dir = !dir;
          break;
        }

      }

    }else { // 从大到小选择

     while(fromMaxToMin.length) {
       const code = fromMaxToMin.pop();

       if(prev === -1 || code < prev) { // 如果选择的code大于上一次选择的code，则加入到result
         result += String.fromCodePoint(code);
         prev = code;
       }else { // 如果不满足，则push到fromMaxToMin
         fromMinToMax.push(code)
       }

       if(code === min) { // 如果pop的code已经到最大，则进入从大到小选择

         // 剩余元素push到fromMaxToMin
         while(fromMaxToMin.length) {
           fromMinToMax.push(fromMaxToMin.pop());
         }
         dir = !dir;
         break;
       }
     }

    }

  }

  return result;

};
