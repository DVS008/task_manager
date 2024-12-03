const { v4: uuidv4 } = require('uuid');
const { readTasksFromFile, writeTasksToFile, updateTaskInFile, deleteTaskFromFile} = require('../services/taskService'); // Import the task service

// Create a new task
const createTask = async (req, res, next) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            const error = new Error("Title and description are required");
            error.status = 400;
            throw error;
        }

        // Read tasks from the file
        const tasks = await readTasksFromFile();

        // Create a new task object
        const newTask = {
            id: uuidv4(), // Generate a unique ID
            title,
            description,
            status: "pending"
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Write the updated tasks array to the file
        await writeTasksToFile(tasks);

        // Send response with the created task
        res.status(201).json({
            message: "Task created successfully",
            task: newTask
        });
    } catch (error) {
        next(error);
    }
};

// Get all tasks
const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await readTasksFromFile(); // Read tasks from file
        res.status(200).json(tasks); // Send tasks as the response
    } catch (error) {
        next(error);
    }
};

// Update a task's status
const updateTask = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate the status
        if (!["pending", "completed"].includes(status.toLowerCase())) {
            const error = new Error("Invalid status");
            error.status = 400;
            throw error;
        }

        // Update the task's status in the file
        const updatedTask = await updateTaskInFile(id, { status: status.toLowerCase() });

        if (!updatedTask) {
            const error = new Error("Task not found");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            message: "Task updated successfully",
            task: updatedTask
        });
    } catch (error) {
        next(error);
    }
};

// Delete a task
const deleteTask = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Delete the task from the file
        const success = await deleteTaskFromFile(id);

        if (!success) {
            const error = new Error("Task not found");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            message: "Task deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};

// Get tasks by status
const filterTasksByStatus = async (req, res, next) => {
    try {
        const { status } = req.params;
        const tasks = await readTasksFromFile(); // Read tasks from file
        const filteredTasks = tasks.filter(task => task.status === status.toLowerCase());

        res.status(200).json(filteredTasks);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createTask,
    getAllTasks,
    updateTask,
    deleteTask,
    filterTasksByStatus
};
