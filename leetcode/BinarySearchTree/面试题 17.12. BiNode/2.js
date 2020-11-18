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
 * 中序遍历的循环
 * O(n)
 * O(H)
 *
 * @param {TreeNode} root
 * @return {TreeNode}
 */

var convertBiNode = function(root) {

  if(!root) {
    return null;
  }

  // 中序遍历的节点队列
  const queue = [];

  // 循环时的上一个节点
  const prev = [];

  let dummy = new TreeNode(null);

  let tail = dummy;

  let node = root;

  // 中序遍历的队列
  do{

    // 先遍历左子树
    while(node) {
      prev.push(node);
      node = node.left;
    }

    // 访问根节点
    if(prev.length) {
      node = prev.pop();

      queue.push(node);

      // 遍历右子树
      node = node.right;
    }

  }while(prev.length || node);

  // 遍历节点
  while (queue.length) {

    node = queue.shift();

    node.left = null;
    node.right = null;

    tail.right = node;

    tail = node;

  }

  return dummy.right;

};
