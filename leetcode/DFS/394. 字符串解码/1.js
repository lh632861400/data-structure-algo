/**
 *
 * thoughts
 *
 * @param {string} s
 * @return {string}
 */
var decodeString = function(s) {

  return dfs(s, 0, s.length - 1)

};

function dfs(str, start, end) {

  if(start > end) {
    return '';
  }

  let result = "";

  for(let i = start; i <= end; i++) {
    let dummy = parseInt(str[i]);

    // 查找数字位置
    if(!Number.isNaN(dummy)) {
      for(let countIndex = i + 1; i <= end; countIndex++) {

        const nextCount = parseInt(str[countIndex]);

        if(!Number.isNaN(nextCount)) {
          dummy = dummy * 10 + nextCount
        }else {
          i = countIndex;
          break;
        }
      }
    }

    // 如果包含编码规则
    if (!Number.isNaN(dummy)) {
      let subStr = end;
      let count = 0;
      for(let j = i; j <= end; j++) {
        if(str[j] === '[') {
          count++;
          continue;
        }

        if(str[j] === ']') {
          count--;

          if(count === 0) {
            subStr = j;
            break;
          }
        }
      }
      let repeatStr = dfs(str, i + 1, subStr - 1);

      let targetStr = repeatStr;

      for(let count = 1; count < dummy; count++) {
        targetStr += repeatStr;
      }

      result += targetStr;

      i = subStr;
    } else {
      result += str[i]
    }

  }

  return result;

}
