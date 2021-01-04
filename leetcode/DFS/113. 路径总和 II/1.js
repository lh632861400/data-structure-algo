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
 * 回溯
 *
 * O(n)
 * O(logn)
 *
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {

  const result = [];

  if(!root) {
    return result
  }

  backtrack(root, 0, [], result, sum)

  return result;

};

function backtrack(node, current, prev, result, sum) {

  if(!node.left && !node.right) {
    if(node.val + current === sum) {
      const arrStr = prev.join(",");
      const arr = arrStr ? arrStr.split(",") : [];
      arr.push(node.val);
      result.push(arr);
    }

    return;
  }

  if(node.left) {

    prev.push(node.val);

    backtrack(node.left, current + node.val, prev, result, sum)

    prev.pop()

  }

  if(node.right) {

    prev.push(node.val);

    backtrack(node.right, current + node.val, prev, result, sum)

    prev.pop()

  }

}
