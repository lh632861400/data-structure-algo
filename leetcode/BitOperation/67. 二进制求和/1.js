/**
 *
 *
 * thoughts:
 * 双指针
 * 参考：
 * 2. 两数相加
 * O(max(a,length, b.length))
 * O(max(a,length, b.length))
 *
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
var addBinary = function(a, b) {

  if(a === '0' || b === '0') {
    return a === '0' ? b : a;
  }

  let jw = 0;

  let i = a.length - 1;

  let j = b.length - 1;

  let res = "";

  while(i >= 0 || j >= 0) {

    const [nextJw, mod] = addBinaryHelper(a[i], b[j], jw)

    res = mod + res;

    jw = nextJw

    if(i >= 0) {
      i--;
    }

    if(j >= 0) {
      j--;
    }

  }

  if(jw > 0) {
    res = jw + res;
  }

  if(res[0] === '0') {
    return res.substring(1)
  }

  return res

};

function addBinaryHelper(a, b, jw) {
  if(!a && !b) {
    return [0, '']
  }

  if(!a) {
    a = 0;
  }

  if(!b) {
    b = 0;
  }

  let temp = a * 1 + b * 1 + jw;

  if(temp >= 2) {
    return [1, (temp - 2) + ""]
  }else {
    return [0, temp + ""]
  }
}
