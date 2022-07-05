import { Router } from "express";
import authCtrl from '../controllers/auth.controller.js';

const router = Router();

router.route('/auth/signin')
    .post(authCtrl.signin);

router.route('/auth/signout')
    .get(authCtrl.signout);


export default router;