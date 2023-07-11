import express, { Request, Response, NextFunction } from 'express';
import {createBook, updateBook, deleteBook, getBooks} from '../controllers/bookControllers';
import { auth } from '../utilities/auth'

const router = express.Router();

router.get('/get', getBooks)
router.post('/create', auth, createBook)
router.put('/update/:bookId', auth, updateBook)
router.delete('/delete', auth, deleteBook)






/* GET home page. */
router.get('/', function(req: Request, res: Response, next: NextFunction) {
  res.render('index', { title: 'Express' });
});

export default router;
