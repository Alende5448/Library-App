import express, { Request, Response, NextFunction } from 'express';
import fs from "fs";
import path from "path";
import { createUser, login } from '../controllers/usersControllers';

const router = express.Router();

router.post('/signup', createUser)
router.post('/login', login)


/* GET users listing. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {


      res.send('respond with a resource');
  
});



export default router;
