const upload = require("../middleware/upload");
const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const router = express.Router();

const {
  addEmployee,
  getEmployees,
  getEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

router.post(
  "/add",
  authMiddleware,
  upload.single("image"),
  addEmployee
);
router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.put(
  "/:id",
  authMiddleware,
  upload.single("image"),
  updateEmployee
);
router.delete("/:id", authMiddleware, deleteEmployee);

module.exports = router;