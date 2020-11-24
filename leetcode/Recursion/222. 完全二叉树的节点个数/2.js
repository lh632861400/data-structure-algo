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
 * https://leetcode-cn.com/problems/count-complete-tree-nodes/solution/chang-gui-jie-fa-he-ji-bai-100de-javajie-fa-by-xia/
 *
 * @param {TreeNode} root
 * @return {number}
 */
var countNodes = function(root) {

  if(!root) {
    return 0;
  }

  const left = countLevel(root.left);
  const right = countLevel(root.right);

  if(left === right) {
    return countNodes(root.right) + (left << 1);
  }else {
    return countNodes(root.left) + (right << 1);
  }

};

function countLevel(root) {
  let level = 0;
  let node = root;
  while(node) {
    level++;
    node = node.left;
  }

  return level;
}
