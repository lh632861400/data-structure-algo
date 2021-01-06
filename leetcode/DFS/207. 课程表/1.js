/**
 *
 * thoughts:
 * https://leetcode-cn.com/problems/course-schedule/solution/ke-cheng-biao-by-leetcode-solution/
 *
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
let arr = [];
let visited = [];
let valid = true;
var canFinish = function(numCourses, prerequisites) {

  arr = new Array(numCourses);
  visited = new Array(numCourses).fill(0);
  valid = true;

  for(let i = 0; i < prerequisites.length; i++) {
    arr[prerequisites[i][1]] = arr[prerequisites[i][1]] || [];
    arr[prerequisites[i][1]].push(prerequisites[i][0])
  }

  for(let i = 0; i < arr.length; i++) {
    if(visited[i] === 0) {
      dfs(i)
    }
  }

  return valid;

};

function dfs(u) {
  visited[u] = 1;

  if(arr[u]) {

    for (let i of arr[u]) {
      if (visited[i] === 0) {
        dfs(i);

        if (!valid) {
          return;
        }
      } else if (visited[i] === 1) {
        valid = false;
        return;
      }
    }
  }

  visited[u] = 2;
}
