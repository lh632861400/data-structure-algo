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
 * 参考：
 * 105. 从前序与中序遍历序列构造二叉树
 *
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {

  const map = {};

  for(let i = 0; i < inorder.length; i++) {

    map[inorder[i]] = i;

  }


  function buldTreeHelper(postLeft, postRight, inLeft, inRight) {

    if(postLeft > postRight) {
      return null;
    }

    const rootValue = postorder[postRight];

    const root = new TreeNode(rootValue);

    const index = map[rootValue];

    const leftSize = index - inLeft;

    root.left = buldTreeHelper(postLeft, postLeft + leftSize - 1, inLeft, index - 1)


    root.right = buldTreeHelper(postLeft + leftSize, postRight - 1, index + 1, inRight)

    return root;

  }

  return buldTreeHelper(0, postorder.length - 1, 0, inorder.length - 1)

};
