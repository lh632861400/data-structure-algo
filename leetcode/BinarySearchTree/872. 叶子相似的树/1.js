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
 *
 * thoughts:
 * 前序遍历
 *
 * O(n)
 * O(n)
 *
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {boolean}
 */
var leafSimilar = function(root1, root2) {

  const result1 = preOrder(root1);

  const result2 = preOrder(root2);

  if(result1.length !== result2.length) {
    return false;
  }

  for(let i = 0; i < result1.length; i++) {
    if(result1[i] !== result2[i]) {
      return false;
    }
  }

  return true;

};

function preOrder(node) {

  const arr = [];

  const result = [];

  while(arr.length || node) {

    while(node) {

      arr.push(node);

      if(isLeaf(node)) {
        result.push(node.val)
      }

      node = node.left;

    }

    node = arr.pop();

    node = node.right;

  }

  return result;

}

function isLeaf(node) {

  if(!node.left && !node.right) {
    return true;
  }

  return false;

}
