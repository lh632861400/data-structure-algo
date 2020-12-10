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
 * @return {number[]}
 */
var inorderTraversal = function(root) {

  const res = [];

  if(root === null) {
    return [];
  }

  inorderTraversalNode(root, res);

  return res;

};

function inorderTraversalNode(node, res) {

  // 递归基
  if(!node) {
    return;
  }

  // 前序遍历

  inorderTraversalNode(node.left, res);

  // 中序遍历
  res.push(node.val);

  inorderTraversalNode(node.right, res);

  // 后续遍历

}
