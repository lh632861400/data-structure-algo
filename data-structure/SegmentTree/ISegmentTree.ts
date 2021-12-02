
export interface ISegmentTree {
  update(idx: number, value: number): void;

  query(L: number, R: number): number;
}
