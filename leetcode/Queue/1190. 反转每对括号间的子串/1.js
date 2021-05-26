/**
 *
 *
 * thoughts:
 * stack
 *
 * @param {string} s
 * @return {string}
 */
var reverseParentheses = function(s) {

  const stack = [];

  const len = s.length;

  let i = 0;

  let temp;
  while(i < len) {

    if(s[i] === ')') {

      let queue = [];
      while(stack.length) {
        temp = stack.pop();

        if(temp === '(') {

          while(queue.length) {
            stack.push(queue.shift());
          }

          break;

        }else {
          queue.push(temp)
        }

      }

    }else {
      stack.push(s[i])
    }

    i++;

  }

  return stack.join("")

};
