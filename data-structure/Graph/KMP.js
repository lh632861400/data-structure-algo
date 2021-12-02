/**
 *
 *
 * kmp算法做字符窜模式匹配符
 *
 * 模式字符窜
 *
 * 带匹配字符窜
 *
 * 前缀函数
 * pi[i] 下标i从0开始记录模式字符窜真前缀和真后缀相等的最大的长度
 *
 * */
function kmp(str, pattern) {
    var n = str.length;
    var result = [];
    var prefix = prefixFunction3(pattern);
    // 区别prefix中其他的0证明已经回退到模式字符窜的开始
    for (var i_1 = pattern.length - 1; i_1 > 0; i_1--) {
        prefix[i_1] = prefix[i_1 - 1];
    }
    prefix[0] = -1;
    var j = 0;
    var i = 0;
    var m = pattern.length;
    while (i < n) {
        // 证明已经匹配到一项
        if (j === m - 1 && str[i] === pattern[j]) {
            result.push(i - j);
            j = prefix[j];
        }
        // 如果字符相等，则同时前进
        if (str[i] === pattern[j]) {
            i++;
            j++;
        }
        else {
            // 移动模式字符窜
            j = prefix[j];
            // 如果模式字符窜已经移动到第一个并且不相等
            if (j === -1) {
                i++;
                j++;
            }
        }
    }
    return result;
}
/**
 *
 *
 * 暴力求解
 *
 * */
function prefixFunction1(str) {
    var n = str.length;
    var prefix = new Array(n).fill(0);
    for (var i = 1; i < n; i++) {
        for (var j = i; j >= 0; j--) {
            if (str.substring(0, j) === str.substring(i - j + 1, i + 1)) {
                prefix[i] = j;
                break;
            }
        }
    }
    return prefix;
}
/**
 *
 *
 * 在第一种基础之上优化比较逻辑
 * prefix[i] len s[i + 1] === s[len] prefix[i + 1] = len + 1;
 *
 * */
function prefixFunction2(str) {
    var n = str.length;
    var prefix = new Array(n).fill(0);
    for (var i = 1; i < n; i++) {
        for (var j = prefix[i - 1] + 1; j >= 0; j--) {
            if (str.substring(0, j) === str.substring(i - j + 1, i + 1)) {
                prefix[i] = j;
                break;
            }
        }
    }
    return prefix;
}
function prefixFunction3(str) {
    var n = str.length;
    var prefix = new Array(n).fill(0);
    for (var i = 1; i < n; i++) {
        var j = prefix[i - 1];
        while (j > 0 && str[i] !== str[j]) {
            j = prefix[j - 1];
        }
        if (str[i] === str[j]) {
            j++;
        }
        prefix[i] = j;
    }
    return prefix;
}
function testPrefixFunction() {
    var str = 'asdasdasdasd';
    // [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    console.log(prefixFunction3(str));
}
function test() {
    var str = "werasdasdasdasdhfgfasdasdasdasdasd";
    var pattern = 'asdasdasdasd';
    console.log(kmp(str, pattern));
}
test();
