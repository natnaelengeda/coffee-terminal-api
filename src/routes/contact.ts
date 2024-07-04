import express from 'express';

// Controller
import {
  contact,
  addContact
} from '../controller/contact';

const router = express.Router();

router.get('/', contact);
router.post('/', addContact);

module.exports = router;