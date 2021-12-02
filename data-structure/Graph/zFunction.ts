/**
 *
 *
 * z函数
 *
 * 扩展kmp
 *
 * z box
 * 匹配段
 *
 * 记录右端点最靠右的匹配段
 *
 *
 * 0 - n - 1
 * case1
 * i > r 当前s[i...n-1]的lcp需要暴力求解
 *
 * case2
 * z[i - l] < r - i + 1证明前缀计算结果是被包含的z[i] = z[i - l]
 *
 * case3
 * z[i - l] > r - i + 1 超出长度的区域需要暴力求解
 *
 * */


function zFunction(text: string) {

  const z = new Array(text.length).fill(0);

  // 规定z[0] = 0
  z[0] = 0;

  // 匹配段
  let l = 0;
  let r = 0;
  for(let i = 1; i < text.length; i++) {

    // case1
    if(i > r) {

      while(i + z[i] < text.length && text[z[i]] === text[i + z[i]]) {
        z[i]++
      }

      // 更新匹配段
     if(i + z[i] - 1 > r) {
       l = i;
       r = l + z[i] - 1;
     }

    }else if(z[i - l] < r - i + 1) {

      // case2
      z[i] = z[i - l]
    }else {

      // case3
      z[i] = r - i;

      while(i + z[i] < text.length && text[z[i]] === text[i + z[i]]) {
        z[i]++
      }

      // 更新匹配段
      if(i + z[i] - 1 > r) {
        l = i;
        r = l + z[i] - 1;
      }

    }

  }

}
