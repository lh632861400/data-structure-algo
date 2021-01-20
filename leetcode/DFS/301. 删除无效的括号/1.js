/**
 * @param {string} s
 * @return {string[]}
 */
let set = new Set();
let min = Number.MAX_SAFE_INTEGER;
var removeInvalidParentheses = function(s) {

  set = new Set();
  min = Number.MAX_SAFE_INTEGER;

  backtrack(s, 0 ,0 ,0, '', 0);

  return [...set]

};

function backtrack(s, index, leftCount, rightCount, expression, removedCount) {

  // base case
  if(index === s.length) {

    if(leftCount === rightCount) {

      if(removedCount <= min) {

        if(removedCount < min) {
          set.clear();

          min = removedCount;
        }

        set.add(expression)
      }

    }

    return;

  }

  const char = s[index];

  if(char !== '(' && char !== ')') {
    backtrack(s, index + 1, leftCount, rightCount, expression + char, removedCount)
  }else {

    backtrack(s, index +1, leftCount, rightCount, expression, removedCount + 1);

    if(char === '(') {
      backtrack(s, index + 1, leftCount + 1, rightCount, expression + char, removedCount)
    }else {

      if(rightCount < leftCount) {
        backtrack(s, index + 1, leftCount, rightCount + 1, expression + char, removedCount)
      }

    }
  }

}
