/**
 * @param {string[]} words
 * @return {string[]}
 */
var findAllConcatenatedWordsInADict = function(words) {

  if(!words.length) {
    return []
  }

  const set = new Set();

  const set2 = new Set();

  for(let i = 0; i < words.length; i++) {
    set.add(words[i])
  }

  words.sort((a, b) => {
    return b.length - a.length;
  })

  const result = [];

  for(let i = 0 ; i < words.length; i++) {
    backtrace(words[i], set, set2, result, 0, 0)
  }

  return result;

};

function backtrace(str, set, set2, result, count, start) {

  if(set2.has(str)) {
    result.push(str);
    return true;
  }

  // base case
  if(start >= str.length) {

    if(count > 1) {
      result.push(str);
      return true;
    }

    return false;
  }

  // [start, i + 1 )
  let startendStr = '';
  for(let i = 0; i < str.length - start; i++) {

    startendStr = str.substring(start, str.length - i);

    if(set.has(startendStr)) {

      if(set2.has(str.substring(str.length - i))) {
        result.push(str);
        set2.add(str);
        return true;
      }

      if(backtrace(str, set, set2, result, count + 1, str.length - i)) {
        set2.add(str)

        return true;
      }
    }

  }

  return false;

}
