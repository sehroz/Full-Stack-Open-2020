import express from "express";
import allService from "../services/allService";
const router = express.Router();

router.get("/", (_req, res) => {
  res.send(allService.getNonSenPats());
});

export default router;
