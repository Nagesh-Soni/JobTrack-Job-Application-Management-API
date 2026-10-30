
const express = require("express");
const applicationRouter = require("./routes/applications.routes");

const app = express();
const port = 4000;

// Parse JSON request bodies
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Root route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Job Tracker API is running!"
    });
});

// Application routes
app.use("/applications", applicationRouter);

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        error: "Route not found!"
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err);

    if (res.headersSent) {
        return next(err);
    }

    res.status(500).json({
        success: false,
        error: "Internal server error!"
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
