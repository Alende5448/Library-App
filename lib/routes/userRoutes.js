"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersControllers_1 = require("../controllers/usersControllers");
const router = express_1.default.Router();
router.post('/signup', usersControllers_1.createUser);
router.post('/login', usersControllers_1.login);
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});
exports.default = router;
