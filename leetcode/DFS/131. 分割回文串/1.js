/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/palindrome-partitioning/solution/131-fen-ge-hui-wen-chuan-hui-su-sou-suo-suan-fa-xi/
 *
 * O(n ^ 2)
 * O(n)
 *
 * @param {string} s
 * @return {string[][]}
 */
var partition = function(s) {

  const result = [];

  backtrack(result, s, [], 0)

  return result;

};

function backtrack(result, s, path, startIndex) {

  if(startIndex >= s.length) {

    if(path.length) {
      const str = path.join(",");
      const arr = str.split(",");
      result.push(arr)
    }

    return;

  }


  for(let i = startIndex; i < s.length; i++) {

    if(isPalindrome(s, startIndex, i)) {
      path.push(s.substring(startIndex, i + 1))
    }else {
      continue;
    }

    backtrack(result, s, path, i + 1);

    path.pop();

  }

}

function isPalindrome(s, startIndex, end) {

  for(let i = startIndex, j = end; i <= j; i++, j--) {
    if(s[i] !== s[j]) {
      return false;
    }
  }

  return true;

}
