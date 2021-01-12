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
 * 递归
 *
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function(root) {

  if(!root) {
    return 0;
  }

  return dfs(root)

};

/**
 *
 * 以node为根节点所能获取的最大金额
 *
 * */
function dfs(node) {

  // base case
  if(!node || (!node.left && !node.right)) {
    if(!node) {
      return 0;
    }
    return node.val;
  }

  let left = 0;
  if(node.left) {
    left = dfs(node.left.left) + dfs(node.left.right)
  }

  let right = 0;

  if(node.right) {
    right = dfs(node.right.left) + dfs(node.right.right)
  }

  return Math.max(dfs(node.left) + dfs(node.right), left + right + node.val)


}
