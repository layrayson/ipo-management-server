import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import { validateRequest } from "../middlewares/validation";
import { loginSchema, registrationSchema } from "../schemas";

const router = Router();

router.post("/register", validateRequest(registrationSchema), register);
router.post("/login", validateRequest(loginSchema), login);

export default router;
