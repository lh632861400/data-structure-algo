/**
 * @param {string} s
 * @return {string[]}
 */
let set = new Set();
var removeInvalidParentheses = function(s) {

  set = new Set();

  let left = 0;

  let right = 0;

  for(let i = 0; i < s.length; i++) {

    if(s[i] === '(') {
      left++;
      continue;
    }

    if(s[i] === ')') {
      right = left > 0 ? right : right + 1;
      left = left > 0 ? left - 1 : left;
    }

  }

  backtrack(s, 0, 0, 0, left, right, '')

  return [...set]

};

function backtrack(s, index, leftCount, rightCount, leftRem, rightRem, expression) {

  if(index === s.length) {
    if(leftCount === rightCount) {
      set.add(expression)
    }

    return;
  }

  const char = s[index];

  if((char === '(' && leftRem > 0) || (char === ')' && rightRem > 0)) {
    backtrack(s, index + 1, leftCount, rightCount, leftRem - (char === '(' ? 1 : 0), rightRem - (char === ')' ? 1 : 0), expression)
  }

  if(char !== '(' && char !== ')') {

    backtrack(s, index + 1, leftCount, rightCount, leftRem, rightRem, expression + char)

  }else {

    if(char === '(') {
      backtrack(s, index+ 1, leftCount + 1, rightCount, leftRem, rightRem, expression + char)
    }else {

      if(rightCount < leftCount) {
        backtrack(s, index + 1, leftCount, rightCount + 1, leftRem, rightRem, expression + char)
      }

    }

  }

}
