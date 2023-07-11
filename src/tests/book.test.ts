import express from "express"
import request from "supertest"
import bookRoute from "../routes/bookRoutes"

const app = express()
app.use(express.json())

app.use("/books", bookRoute);

let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjE4ZGJlY2RhLWQzNTQtNDg2OC04MmNhLTc2OGNmNWU4ZTAxZiIsInVzZXJOYW1lIjoiQnJpYW5qZWZmIiwiZW1haWwiOiJicmlhbmplZmZAeWFob28uY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkLmtoeUZUWDFFdlUzWFpOZlBoOEF2dVZRZTdUQVZmcWIyZ1BRQlQ0N3NwMGViczZpa2R3SmUiLCJjcmVhdGVkQXQiOiIyMDIzLTA2LTI0VDE0OjMyOjIwLjU4NVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTA2LTI0VDE0OjMyOjIwLjU4NVoiLCJpYXQiOjE2ODc5Njg2Mzh9.L-c7L4TiSt5HYOG8elRyCec8CnjXgtagExBW8r-lljw"

describe('integration test for book API', ()=>{
  test('GET /getBook - success- get all books', async()=>{
const {body , statusCode} = await request(app).get('/books/get')
expect(body).toEqual(expect.objectContaining({
   message:expect.any(String),
  getAllBooks : expect.arrayContaining([
      expect.objectContaining({
          title: expect.any(String),
          author: expect.any(String),
          datePublished: expect.any(String),
          description: expect.any(String),
          pageCount: expect.any(String),
          genre: expect.any(String),
          bookId : expect.any(String),
          publisher: expect.any(String),
          createdAt : expect.any(String),
          updatedAt: expect.any(String)
          })
  ])
  
  }))

    expect(statusCode).toBe(200)

  })




// POST ENDPOINT

describe("POST /add - success- create book", ()=>{
  test('should respond with a 200 status code', async()=>{

const response  = await request(app).post('/books/create').send({
  title: "title",
  author: "author",
  datePublished: "datePublished",
  description : "description",
  pageCount : "pageCount",
  genre : "genre",    
  publisher: "publisher",
  createdAt : new Date(),
  updatedAt: new Date()
}).set("authorization" , `Bearer ${token}`)
expect(response.statusCode).toBe(200)
})
test('should specify json in the content type header', async()=>{
const response = await request(app).post('/books/create').send({
  title: "title",
author: "author",
datePublished: "datePublished",
description : "description",
pageCount : "pageCount",
genre : "genre",    
publisher: "publisher",
createdAt : new Date(),
updatedAt: new Date()
})
expect(response.headers[`content-type`]).toEqual(expect.stringContaining("json"))

})

})
describe("PUT request testing", ()=>{
  test('failure when book is not found', async()=>{
    const response  = await request(app).put('/books/update').send({
      title: "title",
      author: "author",
      datePublished: "datePublished",
      description: "description",
      pageCount: "pageCount",
      genre: "genre",
      publisher: "publisher"
    })
expect(response.statusCode).toBe(404)

})

})


describe("DELETE /add - success- updated book", ()=>{
  test('should respond with a 200 status code', async()=>{
    const response  = await request(app).delete('/books/delete').set("authorization" , `Bearer ${token}`)
expect(response.statusCode).toBe(200)


})



})


})

