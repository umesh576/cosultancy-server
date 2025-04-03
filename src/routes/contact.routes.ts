import express from "express";
import {
  addContact,
  deleteContact,
  seeContact,
} from "../controller/contact.controller";

const router = express.Router();

router.post("/add", addContact);
router.get("/see", seeContact);
router.delete("/delete/:id", deleteContact);

export default router;
