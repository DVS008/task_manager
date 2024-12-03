# task_manager
This is a simple Task Manager API built with Express.js that allows users to manage tasks. The API supports creating, updating, deleting, retrieving all tasks, and filtering tasks by their status (pending/completed). Data is stored in memory and tasks are persisted in a tasks.json file.

Features
Create Task: Add a new task with a title and description.
Get All Tasks: Retrieve all tasks in the system.
Update Task: Update the status of a task to pending or completed.
Delete Task: Delete a specific task by ID.
Filter Tasks by Status: Retrieve tasks based on their status (pending/completed).
Installation
To get started with this project, follow these steps:

1. Clone the Repository
bash
Copy code
git clone https://github.com/dvs008/task_manager.git
cd task_manager
2. Install Dependencies
Make sure you have Node.js and npm installed. You can download them from nodejs.org.

Once installed, run the following command to install the project dependencies:

bash
Copy code
npm install
3. Running the Application
After the dependencies are installed, you can start the Express server:

bash
Copy code
npm start
The server will start and listen on port 3000. You should see the following log:


Server running on port 3000


API Endpoints
1. Create Task
POST /tasks
Creates a new task with a title and description. The task's initial status will be "pending".

2. Get All Tasks
GET /tasks
Retrieves all tasks in the system.

3. Update Task
PUT /tasks/:id
Updates the status of a task. The status can be either "pending" or "completed".

4. Delete Task
DELETE /tasks/:id
Deletes a task by ID.

5. Filter Tasks by Status
GET /tasks/status/:status
Filters tasks by their status. The status can be either "pending" or "completed".

Project Structure

task_manager/
├── src/
│   ├── controllers/
│   │   └── taskController.js
│   ├── data/
│   │   └── tasks.json 
│   ├── middlewares/
│   │   └── errorHandler.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── services/
│   │   └── taskService.js
│   └── index.js
├── tests/
│   └── taskManager.test.js
├── .gitignore
├── package.json
├── package-lock.json
└── README.md


Controllers
taskController.js: Contains logic for handling incoming HTTP requests.
Services
taskService.js: Contains the logic for managing tasks, including reading and writing to tasks.json.
Routes
taskRoutes.js: Defines the routes for the API.
Data
tasks.json: A JSON file where tasks are stored temporarily.

Error Handling:
400 Bad Request: Invalid input, such as missing title or description.
404 Not Found: Task not found when trying to update or delete.
500 Internal Server Error: Unexpected errors or issues with the server.
