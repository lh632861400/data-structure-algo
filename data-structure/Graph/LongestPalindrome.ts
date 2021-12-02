/**
 *
 *
 * 最长回文子串
 *
 * manecher算法
 * 在中心扩展的方法上利用之前计算的结果
 *
 * 动态规划
 * 中心扩展
 *
 * */

function findLongestPalindrome(s: string) {

  if(!s || s.length === 1) {
    return s;
  }

  return manacher(s)

}

/**
 *
 *
 * @return {[number, number]} 返回自窜的开始索引和结束索引 [start, end)
 *
 * */
function manacher(s: string) {

  // 填充字符变成奇数字符窜
  const expandedStr = '#';

  let resolveStr = expandedStr;

  for(let i = 0; i < s.length; i++) {
    resolveStr += s[i];
    resolveStr += '#';
  }

  // p[i] i位置回文子串的回文半径
  const p = new Array(resolveStr.length).fill(1);

  // 当前最右边回文子串的中心索引
  let rightSide = 0;

  // 当前最右边回文子串的右边界索引
  let rightSideCenter = 0;

  let maxIndex = -1;

  let maxLen = 0;

  for(let i = 0; i < resolveStr.length; i++) {

    // 如果当前位置为中心的回文在右边界的左边

    if(i < rightSide) {

      // 如果当前位置的以rightSideCenter为中心的镜像位置的信息 包含都在rightSideCenter为中心的会问窜 超出rightSide 2 * rightSideCenter - i镜像位置索引
      p[i] = Math.min(p[2 * rightSideCenter - i], rightSide - i);

    }

    // 更新p[i]超出rightSide或者i在rightSide右边, 如果全部在
    while((i - p[i]) >= 0 && (i + p[i]) < resolveStr.length && resolveStr[i - p[i]] === resolveStr[i + p[i]]) {
      p[i]++;
    }

    // 更新rightSide rightSideCenter
    if(i + p[i] - 1 > rightSide) {
      rightSide = i + p[i] - 1;
      rightSideCenter = i;
    }

    // 更新最长回文信息
    if(p[i] > maxLen) {
      maxIndex = i;
      maxLen = p[i]
    }

  }

  let str =  resolveStr.substring(maxIndex - maxLen + 1, maxIndex + maxLen)

  return str.replace(/#/g, "")

}


function test() {

  console.log(findLongestPalindrome("asdasdasdsad"))
  console.log(findLongestPalindrome("adsasdasdasdasdasdasd"))
  console.log(findLongestPalindrome("adsasdasdasdasdasd"))
  console.log(findLongestPalindrome("asdasdasd"))
  console.log(findLongestPalindrome("aaaaa"))

}

test()

