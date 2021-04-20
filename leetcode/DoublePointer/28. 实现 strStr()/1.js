/**
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

  // 双指针

  let i = 0;
  let j = 0;
  let temp = -1;
  let hlength = haystack.length;
  let nlength = needle.length;

  while(i < hlength) {

    // 查找第一个一样字符的位置
    if(haystack[i] === needle[0]) {
      temp = i;

      // 判断剩余字符长度是否满足
      if(i + nlength <= hlength) {

        j++;

        for(; j < nlength;) {

          if(haystack[i + j] === needle[j]) {
           j++;
          }else {
            i++
            temp = -1;
            j = 0;
            break;
          }

        }

        if(j >= nlength) {
          return temp;
        }

      }else {
        return -1;
      }

    }else {
      i++;
    }

  }

  return temp;

};
