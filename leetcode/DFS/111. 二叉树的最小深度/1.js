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
 * 递归
 *
 * O(n)
 * O(logn)
 *
 * @param {TreeNode} root
 * @return {number}
 */
var minDepth = function(root) {

  if(!root) {
    return 0;
  }

  const leftHeight = minDepth(root.left)

  const rightHeight = minDepth(root.right);

  if(!root.left) {
    return rightHeight + 1;
  }

  if(!root.right) {
    return leftHeight + 1;
  }

  return Math.min(leftHeight, rightHeight) + 1;

};
