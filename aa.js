
// Brian 算法
// 移除最后一位1的bit位
// 11010 -> 11000
result = n & (n - 1)

// 获取最后为1的bit位
result = n & (-n)


void preBmBc(char *x, int m, int bmBc[]) {

  int i;

  for (i = 0; i < ASIZE; ++i)

    bmBc[i] = m;

  for (i = 0; i < m - 1; ++i)

    bmBc[x[i]] = m - i - 1;

}

void suffixes(char *x, int m, int *suff) {

  int f, g, i;

  f = 0；

   suff[m - 1] = m;

  g = m - 1;

  for (i = m - 2; i >= 0; --i) {

    if (i > g && suff[i + m - 1 - f] < i - g)

      suff[i] = suff[i + m - 1 - f];

    else {

      if (i < g)

        g = i;

      f = i;

      while (g >= 0 && x[g] == x[g + m - 1 - f])

        --g;

      suff[i] = f - g;

    }

  }

}

void preBmGs(char *x, int m, int bmGs[]) {

  int i, j, suff[XSIZE];

  suffixes(x, m, suff);

  for (i = 0; i < m; ++i)

    bmGs[i] = m;

  j = 0;

  for (i = m - 1; i >= 0; --i)

    if (suff[i] == i + 1)

      for (; j < m - 1 - i; ++j)

        if (bmGs[j] == m)

          bmGs[j] = m - 1 - i;

  for (i = 0; i <= m - 2; ++i)

    bmGs[m - 1 - suff[i]] = m - 1 - i;

}

void BM(char *x, int m, char *y, int n) {

  int i, j, bmGs[XSIZE], bmBc[ASIZE];

  /* Preprocessing */

  preBmGs(x, m, bmGs);

  preBmBc(x, m, bmBc);

  /* Searching */

  j = 0;

  while (j <= n - m) {

    for (i = m - 1; i >= 0 && x[i] == y[i + j]; --i);

    if (i < 0) {

      OUTPUT(j);

      j += bmGs[0];

    }

    else

      j += MAX(bmGs[i], bmBc[y[i + j]] - m + 1 + i);

  }

}

--------------g----i----f----(m - 1 - (f - i))------m - 1

s[f + 1, m - 1] === s[f - (m - 1 - f - 1) + 1, f]
