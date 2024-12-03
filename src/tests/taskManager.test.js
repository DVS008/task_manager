const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const taskRoutes = require('../routes/taskRoutes');

const app = express();
app.use(bodyParser.json());
app.use("/tasks", taskRoutes);

describe('Task Manager API', () => {
  let taskId = ''; // Variable to store task ID for testing updates and deletes

  // Test case for creating a task
  it('should create a task successfully', async () => {
    const newTask = {
      title: 'Buy groceries',
      description: 'Get milk, eggs, and bread',
    };

    const response = await request(app).post('/tasks').send(newTask).expect(201);

    expect(response.body.message).toBe('Task created successfully');
    expect(response.body.task).toHaveProperty('id');
    expect(response.body.task.title).toBe(newTask.title);
    expect(response.body.task.status).toBe('pending');
    taskId = response.body.task.id; // Store the created task ID for further tests
  });

  // Test case for getting all tasks
  it('should retrieve all tasks', async () => {
    const response = await request(app).get('/tasks').expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  // Test case for updating a task's status
  it('should update a task status', async () => {
    const updatedTask = {
      status: 'completed',
    };

    const response = await request(app)
      .put(`/tasks/${taskId}`)
      .send(updatedTask)
      .expect(200);

    expect(response.body.message).toBe('Task updated successfully');
    expect(response.body.task.status).toBe(updatedTask.status);
  });

  // Test case for updating a task status with invalid ID
  it('should return error if task ID is invalid during update', async () => {
    const updatedTask = {
      status: 'completed',
    };

    const response = await request(app)
      .put('/tasks/invalid-task-id')
      .send(updatedTask)
      .expect(404);
  });

  // Test case for deleting a task
  it('should delete a task successfully', async () => {
    const response = await request(app)
      .delete(`/tasks/${taskId}`)
      .expect(200);

    expect(response.body.message).toBe('Task deleted successfully');
  });

  // Test case for deleting a task with invalid ID
  it('should return error if task ID is invalid during deletion', async () => {
    const response = await request(app)
      .delete('/tasks/invalid-task-id')
      .expect(404);
  });

  // Test case for filtering tasks by status
  it('should retrieve tasks by status (completed)', async () => {
    const response = await request(app)
      .get('/tasks/status/completed')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    response.body.forEach((task) => {
      expect(task.status.toLowerCase()).toBe('completed');
    });
  });

  it('should return empty array for status with no tasks', async () => {
    const response = await request(app)
      .get('/tasks/status/nonexistent-status')
      .expect(200);

    expect(response.body).toEqual([]);
  });
});