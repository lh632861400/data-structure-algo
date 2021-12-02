
/**
 *
 *
 * Boyer Moore算法
 * 字符串匹配算法，比KMP算法快
 *
 * pattern: 模式字符窜p
 * text: 待匹配文本
 * i: 当前模式字符窜正在匹配的字符的索引
 *
 * 坏字符规则
 * 1.如果当前字符p[i]失配，则找到i左侧最后一个相同字符的索引j, 移动模式字符窜i - j 个位置
 * 2.如果当前字符p[i]失配，在text正在匹配的字符在模式字符窜不存在，则移动整个模式字符窜
 *
 * 好后缀规则
 * 1.如果当前字符p[i]失配，如果好后缀在i的左侧存在，则将左侧最后一个相同的后缀移动到text已经匹配的后缀的位置
 * 2.如果当前字符p[i]失配，如果只存在一部分的好后缀，则要求这一部分好后缀在模式字符窜开头匹配，则移动这一部分匹配的后缀到text相应匹配后者的位置
 * 3.如果当前字符p[i]失配，如果i位置左侧不存在好后缀的任何匹配，不包括好后缀的一部分匹配，则移动整个模式字符窜到text当前位置下一个位置
 *
 * 计算每一个索引的最长公共后缀
 * */

function bm(text: string, pattern: string) {

  // 记录模式字符窜在元字符窜中匹配的索引
  const result = []

  // text文本字符窜的长度
  const n = text.length;

  // 模式字符窜
  const m = pattern.length;

  const maxIndex = n - m;

  // 构建坏字符启发式跳转表
  // i失配字符的索引
  // badCharacterHeuristic[i]失配字符索引需要移动的长度
  const badCharacterHeuristic = preProcessToBuildBadCharacterHeuristic(pattern);

  // 构建好后缀启发式跳转表
  // i模式字符窜失配字符的索引
  // goodSuffixHeuristic[i]当前失配索引i需要移动的长度
  const goodSuffixHeuristic = preProcessToBuildGoodSuffixHeuristic(pattern)

  // 进行匹配

  // j在text文本中的偏移量 i + j 代表text[i + j]索引的字符
  let j = 0;
  while(j <= maxIndex) {

    let i = m - 1;

    // 从右往左进行匹配
   for(; i >= 0 && pattern[i] === text[i + j]; i--) {

   }

   // 匹配到子串
    if(i === -1) {
      result.push(j);

      // 这种情况包含了case2和case3
      j += goodSuffixHeuristic[0]
    }else {

      // 坏字符表需要位移badCharacterHeuristic["v"] - (m - 1 - i)
      j += Math.max(badCharacterHeuristic[text.codePointAt(i + j)] - (m - 1 - i), goodSuffixHeuristic[i]);

    }

  }

  function preProcessToBuildBadCharacterHeuristic(pattern: string) {

    // 字符
    const n = 256;

    const m = pattern.length;

    // 下标代表字符
    // badCharacterHeuristic["v"]代表最靠右字符距离模式串串尾的长度
    // 这个构建的不是真正的坏字符表
    const badCharacterHeuristic = new Array(n).fill(m)

    for(let i = 0; i < m - 1; i++) {
      badCharacterHeuristic[pattern.codePointAt(i)] = m - 1 - i;
    }

    return badCharacterHeuristic

  }

  function preProcessToBuildGoodSuffixHeuristic(pattern: string) {

    const m = pattern.length;

    const suffix = suffixArr(pattern);

    // 下标代表位置
    // goodSuffixHeuristic[j]代表失配位置j需要移动的长度
    const goodSuffixHeuristic = new Array(m).fill(m)

    // case3
    for(let i = 0; i < m; i++) {
      goodSuffixHeuristic[i] = m;
    }

    //case2位置i的最长公共后缀
    let j = 0;
    for(let i = m - 1; i >= 0; i--) {

      if(suffix[i] === i + 1) {

        // 不同失配位置j可能存在相同的长度的最长公共前缀后缀
        // i为m - 1存在suffix[i] === i + 1
        // 如果最长公共后缀等于i + 1则只有前面匹配
        // 失配位置0 - j可以把模式字符窜往后m - 1 - i
        for(; j < m - 1 - i; j++) {

          // 可能存在多个位置i的最长公共后缀等于i + 1，但是由于i是从有往左的大的公共后缀包含小的公共后缀，移动距离必须包含
          // 失配长度大的包含失配长度小的
          if(goodSuffixHeuristic[j] === m) {
            goodSuffixHeuristic[j] = m - 1 - i;
          }

        }

      }

    }

    //case1
    // suffix[i] i为字符的位置 suffix[i]代表以i为终点字符 模式字符窜后缀的最长公共后缀
    // 通过i为索引的字符能够间接的计算出索引j为m - 1 - suffix[i]作为失配位置时需要移动的长度
    // 在失配位置j之前存在相同的好后缀s长度为suffix[i]，移动的距离为 m - 1 - i
    for(let i = 0; i <= m - 2; i++) {

      // m - 1 - i从模式字符窜开头开始查找字符
      // m - 1 - suffix[i]从弄湿字符窜结尾开始查找字符
      // 一旦失配 i作为匹配子串在模式字符窜中相同后缀的末尾字符 i位置的字符可以在失配移动到上一次在m - 1 - suffix[i]位置失配字符的位置
      // 需要把开头存在的好后缀移动相应的距离
      // m - 1- suffix[i]是失配位置，根据好后缀长度推出
      // 这个需要间接的计算移动距离的
      goodSuffixHeuristic[m - 1 - suffix[i]] = m - 1 - i;
    }

    return goodSuffixHeuristic

  }

  function suffixArr(pattern: string) {

    const m = pattern.length;

    // 以i为终点字符的最长的公共后缀长度
    const suffix = new Array(m).fill(m);

    suffix[m - 1] = m;

    for(let i = m - 2; i >= 0; i--) {

      let j = i;

      // i - j 移动的距离
      // m - 1 - (i - j)当前正在匹配的索引
      while(j >= 0 && pattern[j] === pattern[m - 1 - (i - j)]) {
        j--;
      }

      // s[i - k...i] === s[m - 1 -k...m-1]
      suffix[i] = i - j;

    }

    return suffix

  }

  return result

}

function test() {

  console.log(bm("werasdasdasdasdhfgfasdasdasdasdasd", "asdasdasdasd"))

}

test()
