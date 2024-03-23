import express from 'express';
import { addFood, createCatagory, getAll } from '../controller/food';
import multer from 'multer';


// Setup Multer Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/images/food");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const uploadImage = multer({ storage: storage });

const router = express.Router();

router.get('/getAll', getAll);
router.post('/createCatagory', createCatagory);
router.post('/addFood', uploadImage.array('image'), addFood);

module.exports = router;
