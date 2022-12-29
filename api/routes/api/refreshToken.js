import express from "express";
import { refreshTokenAdmin, refreshTokenClient } from "../../controllers/refreshTokenController";

const router = express.Router();

router.get("/", refreshTokenAdmin);

router.get("/client", refreshTokenClient);

module.exports = router;