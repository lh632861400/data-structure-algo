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
 * perf:
 * 备忘录
 *
 * @param {TreeNode} root
 * @return {number}
 */
var rob = function(root) {

  const map = new Map();

  return dfs(map, root);

};

function dfs(visited, node) {

  if(node && visited.has(node)) {
    return visited.get(node)
  }

  if(!node) {
    return 0;
  }

  let left = 0;

  if(node.left) {
    left = dfs(visited, node.left.left) + dfs(visited, node.left.right);
  }

  let right = 0;

  if(node.right) {
    right = dfs(visited, node.right.left) + dfs(visited, node.right.right)
  }

  const max = Math.max(dfs(visited, node.left) + dfs(visited, node.right), left + right + node.val)

  visited.set(node, max);

  return max;
}
