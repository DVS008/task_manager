const express = require("express");
const bodyParser = require("body-parser");
const taskRoutes = require("./routes/taskRoutes");
const errorHandler = require("./middlewares/errorHandler");


const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/tasks", taskRoutes);

// Catch-all route for invalid endpoints
app.use((req, res, next) => {
    const error = new Error("Endpoint not found");
    error.status = 404;
    next(error);
});

// Error handler
app.use(errorHandler);

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
