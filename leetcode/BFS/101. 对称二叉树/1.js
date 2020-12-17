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
 * 层序遍历 + 双指针
 * O(n)
 * O(n)
 *
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function(root) {
  if(!root) {
    return true;
  }

  let leftArr = [];
  let rightArr = [];
  leftArr.push(root.left)
  rightArr.push(root.right);

  let num = 0;

  while(true) {

    num = 0;
    let size = leftArr.length;

    for(let i = 0; i < size; i++) {
      if(!leftArr[i]) {
        if(rightArr[i]) {
          return false;
        }

        num++;
      }else {
        if(!rightArr[i]) {
          return false;
        }else {
          if(leftArr[i].val === rightArr[i].val) {
            leftArr.push(leftArr[i].left);
            leftArr.push(leftArr[i].right);
            rightArr.push(rightArr[i].right);
            rightArr.push(rightArr[i].left);
          }else {
            return false;
          }
        }
      }
    }

    if(num === size) {
      return true;
    }

    leftArr = leftArr.slice(size)
    rightArr = rightArr.slice(size)
  }
};
