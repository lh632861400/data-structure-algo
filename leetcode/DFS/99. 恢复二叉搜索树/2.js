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
 *
 * dfs非递归
 *
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function(root) {

  const stack = [];
  const res = [];
  const arr = [];

  if(!root) {
    return;
  }

  stack.push(root);
  let cur = root;

  while(stack.length || cur) {

    // 中序遍历
    while(cur) {
      if (cur.left) {
        stack.push(cur.left)
      }

      cur = cur.left;
    }

      // 中序遍历访问节点
      cur = stack.pop();
      res.push(cur)

      // 遍历右子树
    if(cur.right) {
      stack.push(cur.right);
    }

    cur = cur.right;
  }

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
