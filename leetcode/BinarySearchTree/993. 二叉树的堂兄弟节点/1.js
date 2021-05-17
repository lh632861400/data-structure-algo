/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} x
 * @param {number} y
 * @return {boolean}
 */
var isCousins = function(root, x, y) {

  let queue = [];

  let childrenQueue = [];

  let childrenIndex = [];

  queue.push(root)

  if(root.left) {
    childrenQueue.push(root.left);
    childrenIndex.push(0)
  }

  if(root.right) {
    childrenQueue.push(root.right);
    childrenIndex.push(0)
  }

  let temp;
  while(queue.length) {

    if(childrenQueue.length) {

      if(isCousinsHelper(childrenQueue, childrenIndex, x, y)) {
        return true;
      }

    }

    temp = childrenQueue;
    childrenQueue = [];
    childrenIndex = [];
    for(let i = 0; i < temp.length; i++) {

      if(temp[i].left) {
        childrenQueue.push(temp[i].left)
        childrenIndex.push(i)
      }

      if(temp[i].right) {
        childrenQueue.push(temp[i].right)
        childrenIndex.push(i)
      }

    }

    queue = temp;

  }

  return false;

};

function isCousinsHelper(childrenQueue, childrenIndex, x, y) {

  const values = childrenQueue.map((node) => node.val)

  let i = values.indexOf(x);

  if(i === -1) {
    return false;
  }

  let j = values.indexOf(y);

  if(j === -1) {
    return false;
  }

  if(childrenIndex[i] === childrenIndex[j]) {
    return false;
  }

  return true;

}
