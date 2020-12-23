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
 * 参考
 * 98. 验证二叉搜索树
 *
 * dfs遍历二叉搜索树的每一个节点，发现有问题的minNode和maxNode，交换两个节点的值
 * 中序遍历的结果是升序，找到i > i + 1, j < j - 1，交换着两个节点，就可以恢复中序遍历的结果
 *
 * O(n)
 * O(n)
 *
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {

  // 中序遍历的结果
  const res = [];
  dfs(res, root);

  // 存放错误的两个节点
  const arr = [];

  for(let i = 0; i < res.length; i++) {
    if(arr.length === 0) {
      if (res[i].val > res[i + 1].val) {
        arr.push(res[i]);

      }
    }else if(arr.length === 1) {
      if (res[i].val < res[i - 1].val) {
        arr.push(res[i]);
      }
    }else {
      if (res[i].val < res[i - 1].val) {
        arr[1] = res[i]
      }
    }
  }

  const max = arr[0];
  const min = arr[1];
  const tem = max.val;
  max.val = min.val;
  min.val = tem;

};

/**
 *
 * 遍历以node为根节点的子树是否满足二叉搜索树，不满足交换两个节点的值
 *
 * */
function dfs(res, node) {

  if(!node) {
    return;
  }

  dfs(res, node.left);

  res.push(node);

  dfs(res, node.right);

}
