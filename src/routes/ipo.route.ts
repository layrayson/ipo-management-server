import { Router } from "express";
import {
  createIpo,
  getAllIpos,
  getIpoById,
  getIposByInstitution,
  getSubscriptionsForIpo,
  subscribeToIpo,
} from "../controllers/ipo.controller";
import auth from "../middlewares/auth";
import { upload } from "../middlewares/upload";
import { validateRequest } from "../middlewares/validation";
import { createIPOSchema, ipoSubscriptionSchema } from "../schemas";

const router = Router();

router.post(
  "/",
  auth(["institution"]),
  validateRequest(createIPOSchema),
  upload.array("documents", 3),
  createIpo
);
router.get("/", auth(["institution", "investor"]), getAllIpos);
router.get("/institution", auth(["institution"]), getIposByInstitution);
router.get("/:id", auth(["institution", "investor"]), getIpoById);
router.post(
  "/:id/subscribe",
  auth(["investor"]),
  validateRequest(ipoSubscriptionSchema),
  subscribeToIpo
);
router.get("/:id/subscriptions", auth(["institution"]), getSubscriptionsForIpo);
export default router;
