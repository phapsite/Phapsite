import { Router } from "express";
import { registerUser, loginUser } from "../controllers/authController.ts";

const router = Router();

router.post("/register", registerUser);
//to test
router.post("/login", loginUser);

export default router;