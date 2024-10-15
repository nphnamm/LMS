import { registrationUser } from '../controllers/user.controller';
import express from 'express';
const router = express.Router();

router.post('/registration', registrationUser);



export default router;
