import { Router } from "express";
import {
  createIpo,
  getAllIpos,
  getIpoById,
  getIposByInstitution,
} from "../controllers/ipo.controller";
import auth from "../middlewares/auth";

const router = Router();

router.post("/", auth, createIpo);
router.get("/", auth, getAllIpos);
router.get("/institution", auth, getIposByInstitution);
router.get("/:id", auth, getIpoById);

export default router;
