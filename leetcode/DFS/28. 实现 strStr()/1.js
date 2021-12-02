/**
 *
 *
 * thoughts:
 * kmp算法
 *
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {

  if(!needle) {
    return 0;
  }

  if(!haystack) {
    return -1;
  }

  return kmp(haystack, needle)

};

function kmp(text, pattern) {

  const len = text.length;

  const n = pattern.length;

  const pi = prefixFunction(pattern);

  let i = 0;

  let j = 0;

  while(i <= (len - (n - j))) {

    while(j < n && text[i] === pattern[j]) {
      i++;
      j++
    }

    // 匹配模式字符串
    if(j === n) {
      return i - n
    }

    if(j === 0) {
      i++;
      continue;
    }

    // 查找最长公共前后缀，比较pi[j - 1]和i位置的字符
    j = pi[j - 1]

  }

  return -1;

}

function prefixFunction(pattern) {

  const n = pattern.length;

  const pi = new Array(n).fill(0)

 for(let i = 1; i < n; i++) {

   let j = pi[i - 1];

   while(j > 0 && pattern[j] !== pattern[i]) {
     j = pi[j - 1]
   }

   if(pattern[j] === pattern[i]) {
     j++;
   }

   pi[i] = j;

 }

 return pi;

}
