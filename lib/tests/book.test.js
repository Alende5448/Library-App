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
const express_1 = __importDefault(require("express"));
const supertest_1 = __importDefault(require("supertest"));
const bookRoutes_1 = __importDefault(require("../routes/bookRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/books", bookRoutes_1.default);
let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4ZGJlY2RhLWQzNTQtNDg2OC04MmNhLTc2OGNmNWU4ZTAxZiIsInVzZXJOYW1lIjoiQnJpYW5qZWZmIiwiZW1haWwiOiJicmlhbmplZmZAeWFob28uY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkLmtoeUZUWDFFdlUzWFpOZlBoOEF2dVZRZTdUQVZmcWIyZ1BRQlQ0N3NwMGViczZpa2R3SmUiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI0VDE0OjMyOjIwLjU4NVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI0VDE0OjMyOjIwLjU4NVoiLCJpYXQiOjE2ODc5Njg2Mzh9.L-c7L4TiSt5HYOG8elRyCec8CnjXgtagExBW8r-lljw";
describe('integration test for book API', () => {
    test('GET /getBook - success- get all books', () => __awaiter(void 0, void 0, void 0, function* () {
        const { body, statusCode } = yield (0, supertest_1.default)(app).get('/books/get');
        expect(body).toEqual(expect.objectContaining({
            message: expect.any(String),
            getAllBooks: expect.arrayContaining([
                expect.objectContaining({
                    title: expect.any(String),
                    author: expect.any(String),
                    datePublished: expect.any(String),
                    description: expect.any(String),
                    pageCount: expect.any(String),
                    genre: expect.any(String),
                    bookId: expect.any(String),
                    publisher: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String)
                })
            ])
        }));
        expect(statusCode).toBe(200);
    }));
    // POST ENDPOINT
    describe("POST /add - success- create book", () => {
        test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/books/create').send({
                title: "title",
                author: "author",
                datePublished: "datePublished",
                description: "description",
                pageCount: "pageCount",
                genre: "genre",
                publisher: "publisher",
                createdAt: new Date(),
                updatedAt: new Date()
            }).set("authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        }));
        test('should specify json in the content type header', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).post('/books/create').send({
                title: "title",
                author: "author",
                datePublished: "datePublished",
                description: "description",
                pageCount: "pageCount",
                genre: "genre",
                publisher: "publisher",
                createdAt: new Date(),
                updatedAt: new Date()
            });
            expect(response.headers[`content-type`]).toEqual(expect.stringContaining("json"));
        }));
    });
    describe("PUT request testing", () => {
        test('failure when book is not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).put('/books/update').send({
                title: "title",
                author: "author",
                datePublished: "datePublished",
                description: "description",
                pageCount: "pageCount",
                genre: "genre",
                publisher: "publisher"
            });
            expect(response.statusCode).toBe(404);
        }));
    });
    describe("DELETE /add - success- updated book", () => {
        test('should respond with a 200 status code', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app).delete('/books/delete').set("authorization", `Bearer ${token}`);
            expect(response.statusCode).toBe(200);
        }));
    });
});
