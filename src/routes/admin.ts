import express from 'express';
import { getAll, login, signup } from '../controller/admin';

const router = express.Router();

router.get('/getAll', getAll);
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
