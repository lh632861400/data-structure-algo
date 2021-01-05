/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 *
 * thoughts:
 * 回溯
 *
 * O(n)
 * O(n)
 *
 * perf:
 * 在遍历就计算每一条路径的值
 *
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {

  if(!root) {
    return 0;
  }

  const result = [];

  backtrack(result, '', root);

  let sum = 0;

  for(let i = 0; i < result.length; i++) {
    sum += result[i];
  }

  return sum;

};

function backtrack(result, prev, node) {

  if(!node.left && !node.right) {
    const str = prev + node.val;
    let temp = 0;

    for(let j = 0; j < str.length; j++) {
      temp = temp * 10 + str[j] * 1;
    }

    result.push(temp);
  }

  if(node.left) {
    backtrack(result, prev + node.val, node.left);
  }

  if(node.right) {
    backtrack(result, prev + node.val, node.right);
  }

}
