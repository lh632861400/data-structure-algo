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
 * https://leetcode-cn.com/problems/maximum-sum-bst-in-binary-tree/solution/javadi-gui-by-chan-10/
 *
 * @param {TreeNode} root
 * @return {number}
 */
var maxSumBST = function(root) {

  let maxSum = Number.MIN_SAFE_INTEGER;

  function State(val) {
    // 屬的總和
    this.val = val;
    this.maxElement = Infinity;
    this.minElement = -Infinity;
  }

  // 判斷root為BST
  function isBST(root, leftCnt) {

    if(!root) {
      return true;
    }

    const rightCnt = new State(0);
    const left = isBST(root.left, leftCnt);
    const right = isBST(root.right, rightCnt)

    if(left && (root.left === null || leftCnt.maxElement < root.val) && right && (root.right === null || rightCnt.minElement > root.val)) {

      if(leftCnt.minElement === -Infinity) {
        leftCnt.minElement = root.val;
      }

      if(leftCnt.maxElement === Infinity) {
        leftCnt.maxElement = root.val;
      }

      if(root.right) {
        leftCnt.maxElement = rightCnt.maxElement;
      }else {
        leftCnt.maxElement = root.val;
      }

      leftCnt.val = leftCnt.val + root.val + rightCnt.val;
      maxSum = Math.max(maxSum, leftCnt.val)

      return true;

    }else {

      if(left) {
        maxSum = Math.max(maxSum, leftCnt.val);
      }

      if(right) {
        maxSum = Math.max(maxSum, rightCnt.val)
      }

      return false;

    }

  }

  const leftCnt = new State(0)

  if(isBST(root, leftCnt)) {
    maxSum = Math.max(maxSum, leftCnt.val)
  }

  return Math.max(maxSum, 0)

};

