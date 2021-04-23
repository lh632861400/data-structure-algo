/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function(s) {

  const n = s.length;

  let prev1 = 1;
  let prev2 = 0;
  let temp = 0;

  for(let i = 1; i <= n; i++) {

    // 使用一个字符
    if(s[i - 1] !== '0') {
      temp = temp + prev1
    }

    if(i > 1 && (s[i - 2] !== '0' && (s[i - 2] * 10 + s[i - 1] * 1) <= 26)) {
      temp += prev2;
    }

    [prev2, prev1] = [prev1, temp]

  }

  return temp;

};
