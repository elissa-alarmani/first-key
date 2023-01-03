import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUserCollegeApps, getUserCollegeApp, deleteUserCollegeApp } from "../controllers/collegeApps.js";
const router = express.Router();

/* READ */
router.get("/", verifyToken, getUserCollegeApps);
router.get("/:userId/collegeapps", verifyToken, getUserCollegeApps);
router.get("/:userId/collegeapps/:id", verifyToken, getUserCollegeApp);


/* DELETE */
router.delete("/:userId/collegeapps/:id", verifyToken, deleteUserCollegeApp);


export default router;