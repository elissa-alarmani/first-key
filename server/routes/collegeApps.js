import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getUserCollegeApps } from "../controllers/collegeApps.js";
const router = express.Router();

/* READ */
router.get("/", verifyToken, getUserCollegeApps);
router.get("/:userId/collegeapps", verifyToken, getUserCollegeApps);

/* UPDATE */

export default router;