import express from "express";
import {
  getAllUser,
  getUserById,
  loginUser,
  registerUser,
  updateUser,
} from "../controller/user.controller";
const router = express.Router();

router.post("/register", registerUser);
router.get("/", getAllUser);
router.get("/:id", getUserById);
router.post("/login", loginUser);
router.put("/update", updateUser);

export default router;
