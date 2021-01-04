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
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {

  if(!root) {
    return true;
  }

  const leftHeight = isBalancedHelper(root.left);

  const rightHeight = isBalancedHelper(root.right);

  if(Math.abs(leftHeight - rightHeight) > 1) {
    return false;
  }else {
    return isBalanced(root.left) && isBalanced(root.right);
  }

};

/**
 *
 * 返回以root为节点的高度
 *
 * */
function isBalancedHelper(root) {

  if(!root) {
    return 0;
  }

  const leftHeight = isBalancedHelper(root.left);

  const rightHeight = isBalancedHelper(root.right);

  return Math.max(leftHeight, rightHeight) + 1;

}
