/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/binary-tree-maximum-path-sum/solution/er-cha-shu-zhong-de-zui-da-lu-jing-he-by-leetcode-/
 *
 * @param {TreeNode} root
 * @return {number}
 */
let maxSum = Number.MIN_SAFE_INTEGER;
var maxPathSum = function(root) {

  // 多个测试用例需要充值全局变量
  maxSum = Number.MIN_SAFE_INTEGER;

  maxGain(root);

  return maxSum

};

function maxGain(node) {

  if(!node) {
    return 0;
  }

  const left = Math.max(maxGain(node.left), 0);
  const right = Math.max(maxGain(node.right), 0);

  const newPath = node.val + left + right;

  maxSum = Math.max(maxSum, newPath);

  return node.val + Math.max(left, right);

}

