import express from "express";
import { refreshTokenAdmin, refreshTokenClient } from "../controllers/refreshTokenController.js";

const router = express.Router();

router.get("/", refreshTokenAdmin);

router.get("/client", refreshTokenClient);

export default router;