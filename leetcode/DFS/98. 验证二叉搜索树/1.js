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
 *
 * dfs深度遍历二叉树每一个节点
 *
 * O(n)
 * O(height)
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {

  return bfs(root, Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)

};

/**
 *
 * bfs以node为根节点的子树书否满足二叉搜索树
 *
 * */
function bfs(node, min, max) {

  if(!node) {
    return true;
  }

  // 当前节点大于所在子树的最小值，并且大于所在子树的最大值
  if(node.val <= min || node.val >= max) {
    return false;
  }

  // 判断左右子树是否满足二叉搜索树的条件
  return bfs(node.left, min, node.val) && bfs(node.right, node.val, max)

}
