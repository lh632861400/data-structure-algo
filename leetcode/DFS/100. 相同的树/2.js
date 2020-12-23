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
 * O(max(最大一层的节点个数))
 *
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function(p, q) {

  const pQueue = [];
  const qQueue = [];

  pQueue.push(p);
  qQueue.push(q);

  while(pQueue.length && qQueue.length) {

    // 每一层的个数
    const pSize = pQueue.length;
    const qSize = qQueue.length;

    if(pSize !== qSize) {
      return false;
    }

    for(let i = 0; i < pSize; i++) {
      const p = pQueue.shift();
      const q = qQueue.shift();

      // p === null q === null
      if(p === q) {
        continue;
      }

      if(!p) {
        if(q) {
          return false;
        }
      }

      if(!q) {
        if(p) {
          return false;
        }
      }

      if(p.val !== q.val) {
        return false;
      }

      if(p.left && q.left) {
        pQueue.push(p.left);
        qQueue.push(q.left);
      }else {
        if(!p.left && !q.left) {

        }else {
          return false;
        }
      }

      if(p.right && q.right) {
        pQueue.push(p.right);
        qQueue.push(q.right);
      }else {
        if(!p.right && !q.right) {

        }else {
          return false;
        }
      }

    }

  }

  return true;

};
