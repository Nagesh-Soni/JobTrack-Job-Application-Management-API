
const express = require("express");
const controller = require("../controllers/applications.controller");

const router = express.Router();

// GET all applications
router.get("/", controller.getAllApplications);

// GET application statistics
router.get("/stats", controller.getApplicationStats);

// GET application by ID
router.get("/:id", controller.getApplicationById);

router.post('/', controller.creatApplication)
router.put('/:id', controller.updateApplication)
router.delete('/:id', controller.deleteApplication)

module.exports = router;
