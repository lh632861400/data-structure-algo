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
 * 回溯
 *
 * O(n)
 * O(n)
 *
 * @param {TreeNode} root
 * @return {number}
 */
var sumNumbers = function(root) {

  if(!root) {
    return 0;
  }

  const result = [];

  backtrack(result, '', root);

  let sum = 0;

  for(let i = 0; i < result.length; i++) {

    const str = result[i];

    let temp = 0;

    if(str) {

      for(let j = 0; j < str.length; j++) {
        temp = temp * 10 + str[j] * 1;
      }

      sum += temp;

    }

  }

  return sum;
};

function backtrack(result, prev, node) {

  // base case
  if(!node.left && !node.right) {
    result.push(prev + node.val);
    return;
  }

  if(node.left) {
    backtrack(result, prev + node.val, node.left);
  }

  if(node.right) {

    backtrack(result, prev + node.val, node.right);

  }

}
