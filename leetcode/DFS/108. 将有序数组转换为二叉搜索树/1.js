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
 * 递归
 *
 * O(n)
 * O(logn)
 *
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function(nums) {

  function sortedArrayToBSTHelper(left, right) {

    if(left > right) {
      return null;
    }

    const value = Math.ceil((left + right) / 2);

    const root = new TreeNode(nums[value]);

    root.left = sortedArrayToBSTHelper(left, value - 1);

    root.right = sortedArrayToBSTHelper(value + 1, right);

    return root;

  }

  return sortedArrayToBSTHelper(0, nums.length - 1);

};
