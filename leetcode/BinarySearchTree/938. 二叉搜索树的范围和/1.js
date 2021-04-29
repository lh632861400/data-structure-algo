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
 * 中序遍历
 *
 * @param {TreeNode} root
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var rangeSumBST = function(root, low, high) {

  let sum = 0;

  const stack = [];

  let node = root;

  while(node || stack.length) {

    while(node) {

      stack.push(node);

      // console.log(node.val)

      node = node.left

    }

    node = stack.pop();

    if(node.val >= low && node.val <= high) {
      sum += node.val;
    }else if(node.val > high) {
      break;
    }

    node = node.right;

  }

  return sum;

};
