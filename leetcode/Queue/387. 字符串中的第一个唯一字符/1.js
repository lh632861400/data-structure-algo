/**
 *
 * thoughts:
 * 暴力搜索
 *
 * 遇到第一个字符加入列表，超出字符个数删除
 *
 * O(n)
 * O(1)
 *
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {

  // arr数组维护遍历的顺序
  const arr = [];

  for(let i = 0; i < s.length; i++) {

    // 是否加入列表
    let pushed = false;

    // 如果字符已经存在
    for(let j = 0; j < arr.length; j++) {
      if(arr[j].char === s[i]) {
        arr[j].count++;
        pushed = true;
        break;
      }
    }

    // 字符不存在arr遍历列表，则加入arr
    if(!pushed) {
      arr.push({char: s[i], count: 1, index: i})
    }

  }

  for(let i = 0; i < arr.length; i++) {

    // 如果存在count为1的字符
    if(arr[i].count === 1) {
      return arr[i].index;
    }

  }

  return -1;

};
