/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
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
 * 递归
 *
 * 参考：
 * 108. 将有序数组转换为二叉搜索树
 *
 * O(n)
 * O(n)
 *
 *
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function(head) {

  const values = [];

  let node = head;

  while(node) {

    values.push(node.val);

    node = node.next;

  }

  function sortedListToBSTHelper(left, right) {

    if(left > right) {
      return null;
    }

    const mid = Math.ceil((left + right) / 2);

    const root = new TreeNode(values[mid]);

    root.left = sortedListToBSTHelper(left, mid - 1)

    root.right = sortedListToBSTHelper(mid + 1, right);

    return root;

  }

  return sortedListToBSTHelper(0, values.length - 1);

};
