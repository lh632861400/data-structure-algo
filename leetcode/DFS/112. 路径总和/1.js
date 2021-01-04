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
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function(root, sum) {

  if(!root) {
    return false;
  }

  return hasPathSumHelper(root, 0, sum);

};

/**
 *
 * 返回根节点到当前节点路径和
 *
 * */
function hasPathSumHelper(node, current, sum) {

  if(!node.left && !node.right) {
    return node.val + current === sum;
  }

  if(node.left) {

    if(hasPathSumHelper(node.left, current + node.val, sum)) {
      return true;
    }

  }

  if(node.right) {

    if(hasPathSumHelper(node.right, current + node.val, sum)) {
      return true;
    }

  }

  return false;

}
