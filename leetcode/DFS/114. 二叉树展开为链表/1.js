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
 * 前序遍历
 *
 * O(n)
 * O(n)
 *
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function(root) {

  if(!root) {
    return root;
  }

  const arr = [];

  let cur = root;
  const queue = [root];

  while(queue.length) {

    const node = queue.pop();

    // 前序遍历
    arr.push(node);

    if(node.right) {
      queue.push(node.right)
    }

    if(node.left) {
      queue.push(node.left);
    }

  }

  let prev = arr[0];
  prev.left = null;
  for(let i = 1; i < arr.length; i++) {

    const node = arr[i];
    node.left = null;

    prev.right = node;

    prev = node;

    prev.right = null;



  }

  return arr[0];

};
