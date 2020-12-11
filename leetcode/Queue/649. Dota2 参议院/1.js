/**
 *
 * 暴力求解:
 * 如果是R
 *   R是否需要欠一名参议 r < 0
 *     需要 什么都不做，相当于跳过,r++
 *     不需要r++, d--需要剔除一名D
 * 如果是D
 *   D是否需要欠一名参议 d < 0
 *     需要 什么都不做，相当于跳过,d++
 *     不需要d++, r--需要剔除一名D
 *
 * 最后判断哪一个大于0
 * O(n)
 * O(1)
 *
 * @param {string} senate
 * @return {string}
 */
var predictPartyVictory = function(senate) {

  const map = {
    R: 0,
    D: 0,
  };

  const len = senate.length;
  let last = ''
  for(let i = 0; i < len; i++) {
    const c = senate[i];
    last = c;

    if(map[c] < 0) {
      map[c]++
    }else {
      map[c]++;

      // 判断在他之前是否有对立的参议
      if(c === 'R') {
        map["D"]--;
      }else {
        map["R"]--;
      }
    }
  }

  if(last === 'R') {
    if(map["R"] <= map["D"]) {
      return 'Dire'
    }else {
      // 继续按照投票
    }
  }else {
    if(map["D"] <= map["R"]) {
      return 'Radiant'
    }else {
      // 继续按照投票
    }
  }

};

// 行数定义返回新的sentence和map
function cur(senate) {
  const map = {
    R: 0,
    D: 0,
  };

  const len = senate.length;
  let last = ''
  for(let i = 0; i < len; i++) {
    const c = senate[i];
    last = c;

    if(map[c] < 0) {
      map[c]++
    }else {
      map[c]++;

      // 判断在他之前是否有对立的参议
      if(c === 'R') {
        map["D"]--;
      }else {
        map["R"]--;
      }
    }
  }

  if(last === 'R') {
    if(map["R"] <= map["D"]) {
      return 'Dire'
    }else {
      // 继续按照投票
      return
    }
  }else {
    if(map["D"] <= map["R"]) {
      return 'Radiant'
    }else {
      // 继续按照投票
    }
  }

}
