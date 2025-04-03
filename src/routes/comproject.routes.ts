import express from "express";
import multer from "multer";

import {
  addComproject,
  getAllComProject,
  updateComproject,
} from "../controller/comProject.controller";
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  //it can create teh qnuique file name using the date math and file name
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post(
  "/add",
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  addComproject
);
router.get("/get", getAllComProject);
router.patch("/update", updateComproject);

export default router;
