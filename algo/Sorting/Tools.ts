
export default class Integer {

  static random(min: number, max: number, count: number) {
    const result  = [];
    for(let i = 0; i < count; i++) {
      const num = Integer.randomNum(min, max)
      result.push(num);
    }
  }

  static copy(array: number[]) {
    const result = [];
    for(let i = 0; i < array.length; i++) {
      result.push(array[i]);
    }

    return result;
  }

  static ascOrder(min: number, max: number, disOrderCount) {
    const result = []
    for(let i = disOrderCount + min; i >= min; i--) {
      result.push(i);
    }

    for(let i = 1; i <= max - disOrderCount; i++) {
      result.push(disOrderCount + min + i);
    }

    return result;

  }

  static isAscOrder(array: number[]) {
    if(!array || array.length < 1) {
      return false;
    }

    if(array.length === 1) {
      return true;
    }

    let prev = array[0];
    for(let i = 1; i < array.length; i++) {
      if(prev > array[i]) {
        return false;
      }

      prev = array[i]
    }
  }


  private static randomNum(min: number, max: number) {
    return parseInt((Math.random() * (max - min) + min).toFixed(0));
  }

}


