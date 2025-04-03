import express from "express";
import {
  addService,
  deleteService,
  seeService,
} from "../controller/service.controller";
import multer from "multer";
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
  addService
);
router.get("/see", seeService);
router.delete("/delete", deleteService);
export default router;
