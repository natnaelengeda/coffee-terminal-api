import express from 'express';
import { addFood, createCatagory, getAll, getImage, updateFood } from '../controller/food';
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
router.post('/updateFood', updateFood);
router.post('/addFood', uploadImage.array('image'), addFood);

// Image Api 
router.get('/getImage/:name', getImage);

module.exports = router;
