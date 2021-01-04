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
 * 暴力求解
 *
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function(root) {

};

function maxPathSumHelper(node) {

  if(!node) {
    return 0;
  }

  const left = maxPathSumHelper(node.left);

  const right = maxP

}
