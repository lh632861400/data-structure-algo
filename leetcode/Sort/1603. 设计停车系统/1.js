/**
 * @param {number} big
 * @param {number} medium
 * @param {number} small
 */
var ParkingSystem = function(big, medium, small) {

  this.total = [0, big, medium, small];

  this.current = [0, 0, 0, 0]

};

/**
 * @param {number} carType
 * @return {boolean}
 */
ParkingSystem.prototype.addCar = function(carType) {

  if(this.current[carType] < this.total[carType]) {
    this.current[carType]++;
    return true;
  }else {
    return false;
  }

};

/**
 * Your ParkingSystem object will be instantiated and called as such:
 * var obj = new ParkingSystem(big, medium, small)
 * var param_1 = obj.addCar(carType)
 */
