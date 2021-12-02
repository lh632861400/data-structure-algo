/**
 *
 *
 * thoughts:
 * 滑动窗口 + map
 * O(n)
 * O(n)
 *
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function(s) {

  if(s.length <= 10) {
    return [];
  }

  const result = []

  let target = s.substring(0, 10);

  const map = new Map();

  map.set(target, 1);


  let count = 0;

  for(let i = 1; i <= s.length - 10; i++) {
    target = s.substring(i, i + 10);

    count = map.get(target);

    if(!count) {
      map.set(target, 1);
    }else if(count === 1) {
      result.push(target);
      map.set(target, count + 1)
    }else {
      map.set(target, count + 1);
    }
  }

  return result;

};
