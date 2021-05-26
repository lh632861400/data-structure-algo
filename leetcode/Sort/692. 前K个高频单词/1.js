/**
 *
 *
 * thoughts:
 * 快排
 *
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function(words, k) {

  const map = new Map();

  let value = 0;
  for(let i = 0; i < words.length; i++) {

    value = map.get(words[i]) || 0;

    map.set(words[i], value + 1);

  }

  const arr = [...map.entries()];

  arr.sort((a, b) => {
    if(a[1] === b[1]) {
      return (topKFrequentHelper(a[0], b[0]))
    }else if(b[1] > a[1]) {
      return 1
    }else {
      return -1;
    }

  })

  return arr.slice(0, k).map((a) => a[0])

};

function topKFrequentHelper(str1, str2) {

  let i = 0;;
  let charCode1 = 0;
  let charCode2 = 1;
  while(str1 && str2) {

    if(str1[i] && str2[i]) {

      charCode1 = str1.codePointAt(i);
      charCode2  = str2.codePointAt(i);

      if(charCode1 === charCode2) {
        i++;
        continue;
      }else {
        return charCode1 - charCode2
      }
    }else {
      if(!str1[i]) {
        return -1;
      }else {
        return 1;
      }
    }

  }

}
