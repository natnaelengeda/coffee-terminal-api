import express from 'express';
import { addFood, createCatagory, getAll } from '../controller/food';

const router = express.Router();

router.get('/getAll', getAll);
router.post('/createCatagory', createCatagory);
router.post('/addFood', addFood);

module.exports = router;
