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
 * https://leetcode-cn.com/problems/balance-a-binary-search-tree/solution/jiang-er-cha-sou-suo-shu-bian-ping-heng-by-leetcod/
 *
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var balanceBST = function(root) {

  let queue = []

  // 中序遍历
  inorder(root)
  function inorder(node) {

    if(!node) {
      return;
    }

    if(node.left) {
      inorder(node.left);
    }

    // 将元素入队
    queue.push(node.val);

    if(node.right) {
      inorder(node.right);
    }



  }

  // 构建以l, r为区间的元素的二叉平衡树
  function build(l ,r) {

    const mid = (l + r) >> 1;

    const midNode = new TreeNode(queue[mid]);

    if(l <= mid - 1) {
      midNode.left = build(l, mid - 1);
    }

    if(mid + 1 <= r) {
      midNode.right = build(mid + 1, r);
    }

    return midNode;

  }

  return build(0, queue.length - 1)

};
