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
 * inOrder
 *
 * O(n)
 * O(n)
 *
 * @param {TreeNode} root
 * @return {number}
 */
var minDiffInBST = function(root) {

  const arr = [];

  minDiffInBSTHelper(arr, root);

  // 中序遍历arr是有序的

  let minValue = Number.MAX_SAFE_INTEGER;
  for(let i = 0; i < arr.length - 1;) {
    minValue = Math.min(minValue, Math.abs(arr[i] - arr[++i]));
  }

  return minValue;

};

function minDiffInBSTHelper(arr, node) {

  if(!node) {
    return;
  }

  // 遍历节点子
  minDiffInBSTHelper(arr, node.left)

  // 节点
  arr.push(node.val);

  // 遍历节点
  minDiffInBSTHelper(arr, node.right)

}
