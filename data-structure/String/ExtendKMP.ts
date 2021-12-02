/**
 *
 *
 * 扩展kmp
 *
 * 场景
 * str1和str2 str1[i， n - 1]后缀与str2的最长公共前缀
 *
 * z函数
 * i从小标0开始
 * z[i]是s[i, n - 1]和s字符串的最长公共前缀 z[0] = 0
 *
 * z-box
 * s[l, r]是s的最长公共前缀
 *
 * 第一种情况
 * i <= r
 * 如果z[r - i] <= r - i则z[i] = z[r - i]
 * 如果z[r - i] > r - i则z[i] = z[r - i] + 从r之后比较字符更新z-box
 *
 * 第二种情况
 * i > r
 * 只有暴力比较更新z-box
 *
 *
 * */

function zFunction(pattern: string) {

  let l = 0
  let r = 0;

  const z = new Array(pattern.length).fill(0)

  for(let i = 1; i < pattern.length; i++) {

    if(i <= r) {

      if(z[i - l] < (r - i)) {
        z[i] = z[r - i]
      }else {
        z[i] = z[r - l]
        while((i + z[i]) < pattern.length && pattern[i + z[i]] === pattern[0 + z[i]]) {
          z[i]++
        }

        l = i;
        r = i + z[i] - 1;
      }

    }else {

      z[i] = 0;
      while((i + z[i]) < pattern.length && pattern[i + z[i]] === pattern[0 + z[i]]) {
        z[i]++
      }

      l = i;
      r = i + z[i] - 1;

    }

  }

  return z

}

function extendKMP(str1: string, str2: string) {

  let l = 0
  let r = 0;

  const z = new Array(str1.length).fill(0)

  for(let i = 1; i < str1.length; i++) {

    if(i <= r) {

      if(z[i - l] < (r - i)) {
        z[i] = z[r - i]
      }else {
        z[i] = z[r - l]
        while((i + z[i]) < str1.length && str1[i + z[i]] === str2[0 + z[i]]) {
          z[i]++
        }

        l = i;
        r = i + z[i] - 1;
      }

    }else {

      z[i] = 0;
      while((i + z[i]) < str1.length && str1[i + z[i]] === str2[0 + z[i]]) {
        z[i]++
      }

      l = i;
      r = i + z[i] - 1;

    }

  }

  return z

}

