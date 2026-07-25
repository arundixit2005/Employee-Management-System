const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");

// Add Employee
const addEmployee = async (req, res) => {
  try {
    const {
      employeeId,
      name,
      email,
      password,
      department,
      designation,
      salary,
      phone,
      address,
    } = req.body;

    // Check employee already exists
    const employeeExists = await Employee.findOne({
      $or: [{ email }, { employeeId }],
    });

    if (employeeExists) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      employeeId,
      name,
      email,
      password: hashedPassword,
      department,
      designation,
      salary,
      phone,
      address,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json({
      success: true,
      message: "Employee Added Successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Employees
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().select("-password");

    res.status(200).json({
      success: true,
      count: employees.length,
      employees,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Get Single Employee
const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).select("-password");

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found",
      });
    }

    res.status(200).json({
      success: true,
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = req.file.filename;
    }

    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// Delete Employee
const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
};