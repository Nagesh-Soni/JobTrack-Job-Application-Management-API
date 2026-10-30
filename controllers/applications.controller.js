
const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../data.json");

// Read data from JSON file
function readData() {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw).applications;
}

// Write data to JSON file
function writeData(applications) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify({ applications }, null, 2)
    );
}

// Success response
function sendSuccess(res, status, data) {
    return res.status(status).json({
        success: true,
        data
    });
}

// Error response
function sendError(res, status, message) {
    return res.status(status).json({
        success: false,
        error: message
    });
}

// GET /applications
exports.getAllApplications = (req, res, next) => {
    try {
        const { status, sort, page, limit } = req.query;

        let result = readData();

        if (status) {
            result = result.filter(
                app => app.status.toLowerCase() === status.toLowerCase()
            );
        }

        if (sort === "company") {
            result = result.slice().sort(
                (a, b) => a.company.localeCompare(b.company)
            );
        }

        const total = result.length;

        if (page !== undefined || limit !== undefined) {
            const pageNum = Number(page ?? 1);
            const limitNum = Number(limit ?? 5);

            if (
                !Number.isInteger(pageNum) ||
                !Number.isInteger(limitNum) ||
                pageNum < 1 ||
                limitNum < 1
            ) {
                return sendError(res, 400,
                    "Page and limit must be positive integers"
                );
            }

            const start = (pageNum - 1) * limitNum;
            result = result.slice(start, start + limitNum);
        }

        return sendSuccess(res, 200, {
            total,
            count: result.length,
            applications: result
        });

    } catch (err) {
        next(err);
    }
};

// GET /applications/:id
exports.getApplicationById = (req, res, next) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id < 1) {
            return sendError(res, 400, "Invalid application ID");
        }

        const applications = readData();
        const application = applications.find(app => app.id === id);

        if (!application) {
            return sendError(res, 404, "Application not found");
        }

        return sendSuccess(res, 200, application);

    } catch (err) {
        next(err);
    }
};

// GET /applications/stats
exports.getApplicationStats = (req, res, next) => {
    try {
        const applications = readData();

        const stats = applications.reduce((result, app) => {
            result[app.status] = (result[app.status] || 0) + 1;
            return result;
        }, {});

        return sendSuccess(res, 200, {
            total: applications.length,
            byStatus: stats
        });

    } catch (err) {
        next(err);
    }
};

// POST /applications

exports.creatApplication = (req, res, next) => {
    try {
        const { id, company, role, status } = req.body;

        if (!company || !role) {
            return sendError(res, 400, "Company and role are required");
        }

        const applications = readData();

        let nextID;

        // If user provides ID
        if (id !== undefined) {

            if (!Number.isInteger(id) || id < 1) {
                return sendError(res, 400, "Invalid application ID");
            }

            // Check duplicate ID
            const existingID = applications.find(app => app.id === id);

            if (existingID) {
                return sendError(res, 409, "This ID is already existing");
            }

            nextID = id;

        } else {
            // Automatically generate next ID
            nextID = applications.length > 0
                ? Math.max(...applications.map(app => app.id)) + 1
                : 1;
        }

        const newApplication = {
            id: nextID,
            company,
            role,
            status: status || "Applied",
            applicationDate: new Date().toISOString().split("T")[0]
        };

        applications.push(newApplication);

        writeData(applications);

        return sendSuccess(res, 201, newApplication);

    } catch (err) {
        next(err);
    }
};

// PUT /applications/:id
exports.updateApplication = (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { company, role, status } = req.body;

        const applications = readData();

        const index = applications.findIndex(
            app => app.id === id
        );

        if (index === -1) {
            return sendError(res, 404, "Application not found");
        }

        applications[index] = {
            ...applications[index],
            ...(company !== undefined && { company }),
            ...(role !== undefined && { role }),
            ...(status !== undefined && { status })
        };

        writeData(applications);

        return sendSuccess(res, 200, applications[index]);

    } catch (err) {
        next(err);
    }
};

// DELETE /applications/:id
exports.deleteApplication = (req, res, next) => {
    try {
        const id = Number(req.params.id);

        const applications = readData();

        const index = applications.findIndex(
            app => app.id === id
        );

        if (index === -1) {
            return sendError(res, 404, "Application not found");
        }

        const deletedApplication = applications.splice(index, 1)[0];

        writeData(applications);

        return sendSuccess(res, 200, deletedApplication);

    } catch (err) {
        next(err);
    }
};
