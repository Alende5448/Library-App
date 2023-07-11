"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
var router = express_1.default.Router();
/* GET users listing. */
router.get('/', function (req, res, next) {
    // interface books {
    //   Title: string,
    //   Author: string,
    //   datePublished: string,
    //   Description:  string,
    //   pageCount: number,
    //   Genre: string,
    //   bookId: number,
    //   Publisher: string
    // }
    // let databaseFolder = path.join(__dirname, "database")
    // let databaseFile = path.join(databaseFolder, "database.json")
    // if(!fs.existsSync(databaseFolder)){
    //     fs.mkdirSync(databaseFolder)
    // }
    // if(!fs.existsSync(databaseFile)){
    //     fs.writeFileSync(databaseFile, "")
    // }
    res.send('respond with a resource');
});
module.exports = router;
