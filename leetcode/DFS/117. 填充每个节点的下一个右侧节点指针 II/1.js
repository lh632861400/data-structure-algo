/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 *
 * thoughts:
 * bfs
 *
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {

  if(!root) {
    return root;
  }

  let queue = [];

  queue.push(root);

  while(queue.length) {

    const size = queue.length;

    for(let i = 0; i < size; i++) {

      const node = queue[i];

      if(i === size - 1) {
        node.next = null;
      }else {
        node.next = queue[i + 1]
      }

      if(node.left) {
        queue.push(node.left)
      }

      if(node.right) {
        queue.push(node.right)
      }

    }

    queue = queue.slice(size)

  }

  return root;

};
