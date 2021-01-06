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
 * bfs
 *
 * O(n)
 * O(logn)
 *
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function(root) {

  if(!root) {
    return []
  }

  const queue = [];

  queue.push(root);

  const result = [];

  while(queue.length) {

    const size = queue.length;

    let node;
    for(let i = 0; i < size; i++) {

      node = queue.shift();

      if(node.left) {
        queue.push(node.left);
      }

      if(node.right) {
        queue.push(node.right);
      }

    }

    result.push(node.val)

  }

  return result;

};
