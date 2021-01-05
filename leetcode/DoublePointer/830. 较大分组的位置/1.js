/**
 *
 * thoughts:
 * 双指针
 *
 * O(n)
 * O(1)
 *
 * @param {string} s
 * @return {number[][]}
 */
var largeGroupPositions = function(s) {

  let start = 0;
  let end = 1;
  const result = [];
  const len = s.length;

  if(len < 3) {
    return [];
  }

  // end指针一直到字符窜尾部
  while(end < len) {

    // 如果start === end，则记录判断下一个
    if(s[start] === s[end]) {
      end++;
    }else {

      if(end - start >= 3) {
        result.push([start, end - 1])
      }

      start = end;
      end++;

    }

  }

  if(end - start >= 3) {
    result.push([start, end - 1])
  }

  return result;

};
