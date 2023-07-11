"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.getBooks = exports.createBook = void 0;
const path_1 = __importDefault(require("path"));
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
let databaseFolder = path_1.default.join(__dirname, "../../src/bookDatabase");
let databaseFile = path_1.default.join(databaseFolder, "bookDatabase.json");
// ==========================POST(CREATE) BOOKS========================
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   create database dynamically
        if (!fs_1.default.existsSync(databaseFolder)) {
            fs_1.default.mkdirSync(databaseFolder);
        }
        if (!fs_1.default.existsSync(databaseFile)) {
            fs_1.default.writeFileSync(databaseFile, " ");
        }
        // read from database
        let allBooks = [];
        try {
            const infos = fs_1.default.readFileSync(databaseFile, 'utf8');
            if (!infos) {
                return res.status(400).json({
                    message: `Cannot read file`
                });
            }
            else {
                allBooks = JSON.parse(infos);
            }
        }
        catch (parseError) {
            allBooks = [];
        }
        // Read from frontend
        const bodyData = req.body;
        let existingBook = allBooks.find((book) => book.title === bodyData.title);
        if (existingBook) {
            return res.send({
                message: `Book title already exists`
            });
        }
        // create the book
        let newBook = {
            bookId: (0, uuid_1.v4)(),
            title: bodyData.title,
            author: bodyData.author,
            datePublished: bodyData.datePublished,
            description: bodyData.description,
            pageCount: bodyData.pageCount,
            genre: bodyData.genre,
            publisher: bodyData.publisher,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        allBooks.push(newBook);
        fs_1.default.writeFile(databaseFile, JSON.stringify(allBooks, null, 2), 'utf8', (err) => {
            if (err) {
                return res.status(500).json({
                    message: `Cannot write file`
                });
            }
            else {
                return res.status(200).json({
                    message: `File written successfully`,
                    newBook
                });
            }
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.createBook = createBook;
// ==========================GET(GET) BOOKS========================
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let getAllBooks = [];
    try {
        const data = fs_1.default.readFileSync(databaseFile, "utf-8");
        if (!data) {
            res.status(500).json({
                message: "Error Reading from Database"
            });
        }
        else {
            getAllBooks = JSON.parse(data);
        }
        fs_1.default.writeFile(databaseFile, JSON.stringify(getAllBooks, null, 2), "utf-8", (err) => {
            if (err) {
                return res.status(500).json({
                    message: "You do not have access to this book"
                });
            }
            else {
                return res.status(200).json({
                    message: "Books fetched Successfully",
                    getAllBooks
                });
            }
        });
    }
    catch (parseError) {
        getAllBooks = [];
    }
});
exports.getBooks = getBooks;
// ==========================PUT(UPDATE) BOOKS========================
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let allBooks = [];
    try {
        const infos2 = fs_1.default.readFileSync(databaseFile, "utf-8");
        if (!infos2) {
            return res.status(400).json({
                message: `This book cannot be accessed`,
            });
        }
        else {
            allBooks = JSON.parse(infos2);
        }
        const { bookId } = req.params;
        let getBooks = allBooks.findIndex((a) => a.bookId === bookId);
        const updatedBook = Object.assign(Object.assign(Object.assign({}, allBooks[getBooks]), req.body), { updatedAt: new Date().toISOString() });
        allBooks[getBooks] = updatedBook;
        fs_1.default.writeFile(databaseFile, JSON.stringify(allBooks, null, 2), "utf-8", (err) => {
            if (err) {
                return res.status(500).json({
                    message: `Failed to update the book`,
                });
            }
            else {
                return res.status(200).json({
                    message: "Successfully updated book",
                    updateBook: exports.updateBook
                });
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Failed to update the book`,
        });
    }
});
exports.updateBook = updateBook;
//==========================DELETE BOOKS========================
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let allBooks = [];
    try {
        const infos2 = fs_1.default.readFileSync(databaseFile, "utf-8");
        if (!infos2) {
            return res.status(400).json({
                message: `This book cannot be accessed`,
            });
        }
        else {
            allBooks = JSON.parse(infos2);
        }
        const { title, author, datePublished, description, pageCount, genre, bookId, publisher, } = req.body;
        let getBooks = allBooks.findIndex((a) => a.title === req.body.title);
        allBooks[getBooks] = req.body;
        let delBooks = allBooks.findIndex((a) => a.title === req.body.title); //check if you can add Index to addAllData
        allBooks.splice(delBooks, 1);
        fs_1.default.writeFile(databaseFile, JSON.stringify(allBooks, null, 2), "utf-8", (err) => {
            if (err) {
                return res.status(500).json({
                    message: `Failed to DEETE the book`,
                });
            }
            else {
                return res.status(200).json({
                    message: "File Deleted Successfully",
                    allBooks
                });
            }
        });
    }
    catch (err) {
        return res.status(500).json({
            message: `Failed to DELETE the book`,
        });
    }
});
exports.deleteBook = deleteBook;
