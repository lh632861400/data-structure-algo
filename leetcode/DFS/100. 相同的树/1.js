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
 * dfs深度优先遍历每一个节点，判断每一个节点是否一致
 *
 * O(n)
 * O(height)
 *
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {

  return dfs(p, q)

};

/**
 *
 * 遍历以q, p 为根节点的子树是否是一样的
 *
 * */
function dfs(p, q) {

  if(!p && !q) {
    return true;
  }

  if(!p) {
    if(q) {
      return false;
    }
  }

  if(!q) {
    if(p) {
      return false;
    }
  }

  if(p.val !== q.val) {
    return false;
  }

  return dfs(p.left, q.left) && dfs(p.right, q.right);

}
