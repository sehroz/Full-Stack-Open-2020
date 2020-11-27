/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
import allService from "../services/allService";
import toNewPatEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(allService.getNonSenPats());
});

router.post("/", (req, res) => {
  try {
    const newPatEntry = toNewPatEntry(req.body);

    const addedEntry = allService.addEntry(newPatEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default router;
