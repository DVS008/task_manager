const fs = require('fs').promises; // Use fs.promises for async file operations
const path = require('path');

// Define the path to the tasks.json file
const tasksFilePath = path.join(__dirname, '../data', 'tasks.json');

// Helper function to read tasks from the file asynchronously
const readTasksFromFile = async () => {
    try {
        const data = await fs.readFile(tasksFilePath, 'utf-8');
        return JSON.parse(data); // Parse and return tasks data
    } catch (error) {
        return []; // If the file doesn't exist or is empty, return an empty array
    }
};

// Helper function to write tasks to the file asynchronously
const writeTasksToFile = async (tasks) => {
    try {
        await fs.writeFile(tasksFilePath, JSON.stringify(tasks, null, 2), 'utf-8');
    } catch (error) {
        throw new Error('Error writing tasks to file');
    }
};

// Update a task's details (status or other properties)
const updateTaskInFile = async (id, updatedData) => {
    const tasks = await readTasksFromFile();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return null; // Task not found
    }

    // Update the task's properties
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedData };

    // Write the updated tasks array to the file asynchronously
    await writeTasksToFile(tasks);

    return tasks[taskIndex]; // Return the updated task
};

// Delete a task by ID
const deleteTaskFromFile = async (id) => {
    const tasks = await readTasksFromFile();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
        return null; // Task not found
    }

    // Remove the task from the tasks array
    tasks.splice(taskIndex, 1);

    // Write the updated tasks array to the file asynchronously
    await writeTasksToFile(tasks);

    return true; // Return success
};

module.exports = {
    readTasksFromFile,
    writeTasksToFile,
    updateTaskInFile,
    deleteTaskFromFile
};
