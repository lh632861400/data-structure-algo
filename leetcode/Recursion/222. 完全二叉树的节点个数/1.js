/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {

  if(!root) {
    return 0;
  }

  let count = 1;
  const queue = [];
  queue.push(root);
  let node;

  while(queue.length) {

    node = queue.shift();

    if(node.left) {
      queue.push(node.left)
      count++;
    }

    if(node.right) {
      queue.push(node.right);
      count++;
    }
  }

  return count;



};
