import express from "express";
import { refreshToken } from "../../controllers/refreshTokenController";

const router = express.Router();

router.get("/", refreshToken);

module.exports = router;