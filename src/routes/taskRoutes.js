const express = require("express");
const {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask,
    filterTasksByStatus,
} = require("../controllers/taskController");

const router = express.Router();

// Route definitions
router.get("/", getAllTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/status/:status", filterTasksByStatus);

module.exports = router;
