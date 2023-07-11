"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookControllers_1 = require("../controllers/bookControllers");
const auth_1 = require("../utilities/auth");
const router = express_1.default.Router();
router.get('/get', bookControllers_1.getBooks);
router.post('/create', auth_1.auth, bookControllers_1.createBook);
router.put('/update/:bookId', auth_1.auth, bookControllers_1.updateBook);
router.delete('/delete', auth_1.auth, bookControllers_1.deleteBook);
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
exports.default = router;
