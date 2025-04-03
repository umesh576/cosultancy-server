import express from "express";
// import { onlyAdmin } from "../@types/global.types";
import {
  deleteUserProject,
  getallUserProject,
  giveProject,
  userProjectUpdate,
} from "../controller/giveProject.controller";
const router = express.Router();

router.post("/add", giveProject);
router.get("/", getallUserProject);
router.delete("/delete", deleteUserProject);
router.patch("/update", userProjectUpdate);
export default router;
