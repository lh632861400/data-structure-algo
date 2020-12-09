/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/split-array-into-fibonacci-sequence/solution/jiang-shu-zu-chai-fen-cheng-fei-bo-na-qi-ts6c/
 * 回溯
 *
 * private void backtrack("原始参数") {
    //终止条件(递归必须要有终止条件)
    if ("终止条件") {
        //一些逻辑操作（可有可无，视情况而定）
        return;
    }

    for (int i = "for循环开始的参数"; i < "for循环结束的参数"; i++) {
        //一些逻辑操作（可有可无，视情况而定）

        //做出选择

        //递归
        backtrack("新的参数");
        //一些逻辑操作（可有可无，视情况而定）

        //撤销选择
    }
}

 作者：sdwwld
 链接：https://leetcode-cn.com/problems/split-array-into-fibonacci-sequence/solution/javahui-su-suan-fa-tu-wen-xiang-jie-ji-b-vg5z/
 来源：力扣（LeetCode）
 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
 *
 * @param {string} S
 * @return {number[]}
 */
var splitIntoFibonacci = function(S) {

  function backTrack(S, res, index) {
    // 如果res.length > 2 && index >= S.length
    if(index >= S.length && res.length > 2) {
      return true;
    }

    for(let i = index; i < S.length; i++) {
      debugger;

      if(S[index] === '0' && i > index) { // 不需要继续分支
        break;
      }

      const num = toNumber(S, index, i + 1);
      if(num > (Math.pow(2, 31) - 1)) {
        break;
      }

      if(res.length >= 2 && num > (res[res.length - 1] + res[res.length - 2])) {
        break;
      }

      // 如果res长度不够直接选择当前可能或者num等于前两个数字之和
      if(res.length <=1 || num === (res[res.length - 1] + res[res.length - 2])) {

        res.push(num);

        if(backTrack(S, res, i + 1)) {
          return true;
        }

        res.pop();

      }

    }

    return false;

  }

  const res = [];
  backTrack(S, res, 0);

  if(res.length <= 2) {
    return []
  }

  return res;

};

function toNumber(S, start, end) {
  let res = 0;
  for(let i = start; i < end; i++) {
    res = res * 10 + S[i] * 1;
  }

  return res;

}
