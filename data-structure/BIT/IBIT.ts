
export interface IBIT {

  parent(i : number);

  update(i: number, delta: number);

  query(l: number, r: number);

}
