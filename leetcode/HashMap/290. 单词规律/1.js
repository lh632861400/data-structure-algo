/**
 *
 * thoughts:
 * 采用HashMap，遇到不存在的key则保存，存在的key比较是否是之前一样的值
 *
 * O(nlgn)
 *
 * O(m)
 *
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
var wordPattern = function(pattern, s) {

  const map = new Map();
  const map2 = new Map();

  const arr = s.split(/\s+/);

  if(pattern.length !== arr.length) {
    return false;
  }

  for(let i = 0; i < pattern.length; i++) {

    // 如果存在key
    if(map.has(pattern[i]) || map2.has(arr[i])) {
      if(map.get(pattern[i]) === arr[i] && map2.get(arr[i]) === pattern[i]) {
        continue;
      }else {
        return false;
      }
    }else {
      map.set(pattern[i], arr[i])
      map2.set(arr[i], pattern[i])
    }

  }

  return true;

};
