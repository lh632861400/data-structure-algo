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
 * 遍历所有节点
 *
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function(preorder, inorder) {

  const map = {};

  for(let i = 0; i < inorder.length; i++) {
    map[inorder[i]] = i;
  }


  /**
   *
   * 构建preLeft, preRight, inLeft, inRight索引位置的二叉树
   *
   * */
  function buildTreeHelper(preLeft, preRight, inLeft, inRight) {

    if(preLeft > preRight) {
      return null;
    }

    const rootValue = preorder[preLeft];

    const root = new TreeNode(rootValue);

    const index = map[rootValue];

    const leftSize = index - inLeft;

    root.left = buildTreeHelper(preLeft + 1, preLeft + leftSize, inLeft, index - 1);

    root.right = buildTreeHelper(preLeft + leftSize + 1, preRight, index + 1, inRight)

    return root;

  }

  return buildTreeHelper(0, preorder.length - 1, 0, inorder.length - 1)

};
