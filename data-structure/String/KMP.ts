/**
 *
 *
 * 真前缀
 * 字符串[0, i]的子窜[0, k] k < i
 *
 * 真后缀
 * 字符串[0, i]的子窜[k, i] k > 0
 *
 * 模式字符串的下标从1开始
 * 最长公共真前后缀
 * pi[i]代表模式字符串适配位置[0, i - 1]字符串的最长公共真前后缀的长度
 *
 * 场景
 * 字符串匹配
 *
 * 当前j位置模式字符串失配差找[0, j - 1]之间的最长公共前后缀移动字符串开头到后缀匹配的地方这样相等前后缀
 * 最长公共前后缀是为了不会移动过长的距离的
 *
 * 中间不存在一个位置可以移动
 * 如果中间存在一个位置可以移动，那么就证明不是最长公共前后缀所以中间一定不存在一个位置可以移动
 *
 * pi[1]模式字符串第一个字符失配 pi[1] == 0 将文本字符窜当前下标加1
 * pi[2]模式字符窜第二个字符失配 pi[2] == 0 前面不存在真前缀和真后缀 将模式字符串的当前下标重置为1在进行比较
 * pi[3]模式字符串第三个字符失配 pi[3] == x 将模式字符串的下标重置为pi[i]与当前文本字符窜下标进行比较
 *
 * 前缀函数
 * pi[i]数组就是前缀函数
 *
 * i文本字符串下标
 * j模式字符串下标
 * next数组是前缀函数的一种变形为了就是在失配位置i差找最长公共前后缀的长度不用差找pi[i - 1]
 * next[0] === -1就是为了表示模式字符串第一个字符失配
 *
 *
 * */

/**
 *
 *
 * 当前最长公共前后缀包含当前字符作为末尾pi[i]是包含当前字符pattern[i]
 *
 * */
function prefixFunction(pattern: string) {

  const pi = new Array(pattern.length - 1).fill(0);

  for(let i = 1; i < pattern.length; i++) {

    let j = pi[i - 1];

    while(j > 0 && pattern[j] !== pattern[i]) {
      // 1. 从末尾看[i - 1 - j + 1, i - 1]是最长公共前后缀
      // 2. pattern[j]有两层含义第一层就是最长公共前后缀的长度如果pattern[j] === patter[i]则最长公共前后缀加1
      // 如果不相等则差找更小范围的公共前后缀[k, i - 1]，也就是在[i - 1 - j + 1, i - 1]中差找，由于[0, j - 1]与[i - 1 - j + 1, i - 1]相等则是差找[0, j - 1]的最长公共前后缀j2就能够推出[i - 1 - j2 + 1, i - 1]是第二个小的最长贡藕给你前后缀
      j = pi[j - 1]
    }

    // 可能就不存在最长公共前后缀
    if(pattern[j] === pattern[i]) {
      j++
    }

    pi[i] = j;

  }

  return pi

}

function kmp(text: string, pattern: string) {

  const len = text.length;

  const n = pattern.length;

  const pi = prefixFunction(pattern);

  const result = [];

  let i = 0, j = 0;

  // 模式字符串匹配不要超过文本字符窜
  while(i <= (len - (n - j))) {

    // 字符相等
    while(j < n && text[i] === pattern[j]) {
      i++;
      j++
    }

    // 如果全部匹配
    if(j === pattern.length) {
      result.push(i - pattern.length)

      j = pi[j - 1];

      continue
    }

    // 第一个字符位置失配文本字符串下移一位
    if(j === 0) {
      i++;
      continue;
    }

    // 如果存在失配
    j = pi[j - 1]

  }

  return result

}

test()

function test() {

  console.log(kmp("abababababaaab", 'aaab'))

}
