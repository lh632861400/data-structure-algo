/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function(root) {

  if(!root) {
    return []
  }

  const result = []

  binaryTreePathsHelper(result, '', root)

  return result;

};

function binaryTreePathsHelper(result, prev, node) {

  if(!node.left && !node.right) {
    result.push(`${prev}->${node.val}`.substring(2));
    return;
  }

  if(node.left) {
    binaryTreePathsHelper(result, `${prev}->${node.val}`, node.left)
  }

  if(node.right) {
    binaryTreePathsHelper(result, `${prev}->${node.val}`, node.right)
  }

}
