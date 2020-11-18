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
 * 中序遍历递归版本
 * O(n)
 * o(1)
 *
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var convertBiNode = function(root) {

  const dummy = new TreeNode(null);
  dfs(root, dummy);

  return dummy.right;

  // 找到node为根节点中序遍历当前最小的节点，关联链表和节点，返回链表最后一个节点
  function dfs(node, tail) {

    // tail 链表的最后一个节点

    if(!node) {
      return tail;
    }

    // 找到当前最小的节点，返回链表的最后一个节点
    tail = dfs(node.left, tail);

    // 子节点已经在链表中需要删除node.left
    node.left = null;

    // 关联链表和节点
    tail.right = node;

    // 关联成功后链表的最后一个节点就为node
    tail = node;

    // 中序遍历node.right
    tail = dfs(node.right, tail);

    return tail;


  }

};
