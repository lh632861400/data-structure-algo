/**
 *
 *
 * kmp算法做字符窜模式匹配符
 *
 * 模式字符窜
 *
 * 带匹配字符窜
 *
 * 前缀函数
 * pi[i] 下标i从0开始记录模式字符窜真前缀和真后缀相等的最大的长度
 *
 * prefix前缀表
 *
 * next是对前缀表的一种变形
 *
 * */

function kmp(str: string, pattern: string) {

  const n = str.length

  const result = [];

  const next = prefixFunction3(pattern);

  // 区别prefix中其他的0证明已经回退到模式字符窜的开始
  for(let i = pattern.length - 1; i > 0; i--) {
    next[i] = next[i - 1]
  }
  next[0] = -1

  let j = 0;

  let i = 0;

  const m = pattern.length;

  while(i < n) {


    // 证明已经匹配到一项
    if(j === m - 1 && str[i] === pattern[j]) {
      result.push(i - j);

      j = next[j];
    }

    // 如果字符相等，则同时前进
    if(str[i] === pattern[j]) {
      i++;
      j++;
    }else {

      // 前一个字符最长公共后缀长度next[j] 需要移动的距离就是 j - next[j]
      // 换成将指针进行移动就是next[j]，next[j]下一个需要比较的字符的索引
      j = next[j];

      // 如果模式字符窜已经移动到第一个并且不相等
      if(j === -1) {
        i++;
        j++;
      }

    }

  }

  return result

}

/**
 *
 *
 * 暴力求解
 *
 * */
function prefixFunction1(str: string) {

  const n = str.length;

  const prefix = new Array(n).fill(0);

  for(let i = 1; i < n; i++) {

    for(let j = i; j >= 0; j--) {

      if(str.substring(0, j) === str.substring(i - j + 1, i + 1)) {
        prefix[i] = j;
        break
      }

    }

  }

  return prefix;

}

/**
 *
 *
 * 在第一种基础之上优化比较逻辑
 * prefix[i] len s[i + 1] === s[len] prefix[i + 1] = len + 1;
 *
 * */
function prefixFunction2(str: string) {

  const n = str.length;

  const prefix = new Array(n).fill(0);

  for(let i = 1; i < n; i++) {

    for(let j = prefix[i - 1] + 1; j >= 0; j--) {

      if(str.substring(0, j) === str.substring(i - j + 1, i + 1)) {
        prefix[i] = j;
        break
      }

    }

  }

  return prefix;

}

function prefixFunction3(str: string) {

  const n = str.length;

  const prefix = new Array(n).fill(0);

  for(let i = 1; i < n; i++) {

    let j = prefix[i - 1];

    while(j > 0 && str[i] !== str[j]) {
      j = prefix[j - 1]
    }

    if(str[i] === str[j]) {
      j++
    }

    prefix[i] = j

  }

  return prefix

}

function testPrefixFunction() {

  const str = 'asdasdasdasd';

  // [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  console.log(prefixFunction3(str))

}

function test() {

  const str = "werasdasdasdasdhfgfasdasdasdasdasd"

  const pattern = 'asdasdasdasd';

  console.log(kmp(str, pattern))

}

test()

function prefixFunction(pattern: string) {

  const prefix = new Array(pattern.length).fill(0);

  // prefix[0]为0
  prefix[0] = 0;

  for(let i = 1; i < pattern.length; i++) {

    // 前缀子串的长度j，前缀最后一个字符位置j-1
    // 前缀子串末尾字符的位置j相等前缀最后一个字符的下一个字符位置j
    // prefix[i - 1]前一个后缀的最长相等前后缀的长度
    let j = prefix[i - 1]

    // 如果前缀末尾和后缀末尾字符不相等，需要计算更小的最长相等前后缀j = prefix[j - 1]
    // s[0, j - 1] === s[p1...i - 1]
    //s[p1...i-1]缩小到更小的最长相等前缀 s[p2...i-1] p2到i-1的长度就通过prefix[j - 1]推出来，可以理解成最长公共后缀的长度
    // 由于j是最长相等前后缀的长度，也就是下一个待比较的字符
    // 如果相等那就证明长度加1，不相等继续执行2-5
    while(j > 0 && pattern[i] !== pattern[j]) {

      // j到0说明已经不存在更小后缀

      j = prefix[j - 1];

    }

    if(pattern[i] === pattern[j]) {
      j++;
    }

    prefix[i] = j;


  }

}

