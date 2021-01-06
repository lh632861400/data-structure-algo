/**
 * // Definition for a Node.
 * function Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 *
 * thoughts:
 * dfs
 *
 * O(n)
 * O(max(path))
 *
 * @param {Node} node
 * @return {Node}
 */
var cloneGraph = function(node) {

  if(!node) {
    return node;
  }

  const visited = new Map();

  return dfs(visited, node);

};

/**
 *
 * 遍历node节点的图，并且返回新的clone节点
 *
 * */
function dfs(visited, node) {

  // 已经遍历过node
  if(visited.has(node)) {
    return visited.get(node);
  }

  const clonedNode = new Node(node.val);

  visited.set(node, clonedNode);

  const neighbors = [];

  if(node.neighbors) {
    node.neighbors.forEach((neighborNode) => {
      neighbors.push(dfs(visited, neighborNode));
    })
  }

  clonedNode.neighbors = neighbors;

  return clonedNode;

}
