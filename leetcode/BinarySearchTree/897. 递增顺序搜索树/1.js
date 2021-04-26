/**
 *
 * thoughts:
 * 中序遍历
 *
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var prevNode;
var increasingBST = function(root) {

  prevNode = new TreeNode(-1);


  const temp = prevNode;

  inorder(root)

  return temp.right

};

function inorder(node) {
  if(!node) {
    return;
  }

  // left最小节点
  inorder(node.left);

  if(prevNode) {
    prevNode.right = node;
  }
  node.left = null;
  prevNode = node;

  // right最大节点
  inorder(node.right);

}
