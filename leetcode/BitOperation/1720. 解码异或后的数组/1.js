/**
 *
 *
 * thoughts:
 * bit operation
 *
 * O(n)
 * O(1)
 *
 * @param {number[]} encoded
 * @param {number} first
 * @return {number[]}
 */
var decode = function(encoded, first) {

  const result = [];

  result.push(first);

  let prev = first;
  for(let value of encoded) {
    prev = prev ^ value;
    result.push(prev)
  }

  return result;

};
