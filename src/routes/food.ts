import express from 'express';
import multer from 'multer';

// Conteroller
import {
  addFood,
  createCatagory,
  deleteFood,
  getAll,
  getImage,
  updateFood,
  updateFoodImage
} from '../controller/food';

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

router.get('/', getAll);
router.put('/', updateFood);
router.post('/', uploadImage.array('image'), addFood);
router.post('/createCatagory', createCatagory);

router.post("/image", uploadImage.single("image"), updateFoodImage);
router.delete("/:id", deleteFood);

// Image Api 
router.get('/getImage/:name', getImage);

module.exports = router;
