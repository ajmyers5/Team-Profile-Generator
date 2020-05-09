const Employee = require("./Employee");

class Manager extends Employee {
  constructor(id, name, email, officeNum) {
    super(id, name, email, "Manager");
    this.officeNum = officeNum;
  }
  getRole() {
    return "Manager";
  }
  getOfficeNumber() {
    return this.officeNum;
  }
}

module.exports = Manager;
