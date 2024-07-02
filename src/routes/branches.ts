import express from 'express';
import multer from 'multer';

// Controller
import {
  create,
  deleteBranch,
  getAll,
  getImage,
  update,
  updateImage
} from '../controller/branches';

// Setup Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/branches");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadImage = multer({ storage: storage });

const router = express.Router();

router.get("/", getAll);
router.get("/getImage/:name", getImage);
router.post("/", uploadImage.single("image"), create);
router.put("/", update);
router.post("/image", uploadImage.single("image"), updateImage);
router.delete("/:id", deleteBranch);

module.exports = router;