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
 * bfs
 *
 * O(n)
 * O(max(一层节点数量最多的一层))
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function(root) {

  // 存储节点
  const queue = [];

  // 储存一个节点需要满足的最小值和最大值
  const queueMinMax = [];

  if(!root) {
    return true;
  }

  queue.push(root);
  queueMinMax.push(Number.MIN_SAFE_INTEGER);
  queueMinMax.push(Number.MAX_SAFE_INTEGER);

  while(queue.length) {

    const node = queue.shift();
    const min = queueMinMax.shift();
    const max = queueMinMax.shift();

    if(node.val <= min || node.val >= max) {
      return false;
    }

    // 如果存在左子节点
    if(node.left) {
      queue.push(node.left);
      queueMinMax.push(min);
      queueMinMax.push(node.val);
    }

    // 如果存在右子节点
    if(node.right) {
      queue.push(node.right);
      queueMinMax.push(node.val);
      queueMinMax.push(max);
    }

  }

  return true;

};
