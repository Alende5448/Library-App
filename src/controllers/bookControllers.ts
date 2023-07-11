import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { v4 } from 'uuid';
import fs from 'fs';

let databaseFolder = path.join(__dirname, "../../src/bookDatabase")
let databaseFile = path.join(databaseFolder, "bookDatabase.json")

// ==========================POST(CREATE) BOOKS========================

export const createBook = async(req:Request, res: Response, next: NextFunction) => {
    try{
        //   create database dynamically
        if(!fs.existsSync(databaseFolder)){
            fs.mkdirSync(databaseFolder)
        }
        if(!fs.existsSync(databaseFile)){
            fs.writeFileSync(databaseFile, " ")
        }

        // read from database
        let allBooks:any[] = [];
        try{
            const infos = fs.readFileSync(databaseFile, 'utf8')
            if(!infos){
                return res.status(400).json({
                    message: `Cannot read file`
                })
            }else{
                allBooks = JSON.parse(infos)
            }
        }catch(parseError){
            allBooks = []
        }
        
// Read from frontend

        const bodyData = req.body

          let existingBook = allBooks.find((book)=> book.title === bodyData.title);
          if(existingBook){
            return res.send({
                message: `Book title already exists`
            })
          }
       // create the book
          let newBook = {
            bookId: v4(),
            title: bodyData.title,
            author: bodyData.author,
            datePublished: bodyData.datePublished,
            description: bodyData.description,
            pageCount: bodyData.pageCount,
            genre: bodyData.genre,
            publisher: bodyData.publisher,
            createdAt: new Date(),
            updatedAt: new Date()
          }

          allBooks.push(newBook)

          fs.writeFile(databaseFile, JSON.stringify(allBooks, null, 2), 'utf8', (err) => {
            if(err){
                return res.status(500).json({
                    message: `Cannot write file`
                })
            }else{
                return res.status(200).json({
                    message: `File written successfully`,
                    newBook
                })
            }
          })
    }catch(err){
        console.log(err)
    }
}


// ==========================GET(GET) BOOKS========================
export const getBooks =async(req:Request, res:Response)=>{
    let getAllBooks:[] =[]
   try {
       const data = fs.readFileSync(databaseFile, "utf-8")
          if(!data){
            res.status(500).json({
                message: "Error Reading from Database"
            })
          } else{
               getAllBooks= JSON.parse(data)
          } 
          fs.writeFile(databaseFile, JSON.stringify(getAllBooks, null,2), "utf-8",(err)=>{
           if(err){
               return res.status(500).json({
                   message: "You do not have access to this book"
                  })  
           }else{
               return res.status(200).json({
                   message: "Books fetched Successfully",
                   getAllBooks
                  }) 
               
           }
              
       })
          
        } catch (parseError) {
           getAllBooks = []  
        }
 }

// ==========================PUT(UPDATE) BOOKS========================

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
    let allBooks: any[] = [];

    try {
        const infos2 = fs.readFileSync(databaseFile, "utf-8");

        if (!infos2) {
            return res.status(400).json({
                message: `This book cannot be accessed`,
            });
        } else {
            allBooks = JSON.parse(infos2);
        }

        const {bookId} = req.params;

        let getBooks = allBooks.findIndex((a) => a.bookId === bookId);
        
        const updatedBook = { ...allBooks[getBooks], ...req.body, updatedAt: new Date().toISOString()};
        allBooks[getBooks] = updatedBook;
        
        fs.writeFile(databaseFile, JSON.stringify(allBooks, null, 2), "utf-8", (err) => {
            if (err) {
                return res.status(500).json({
                    message: `Failed to update the book`,
                });
            } else {
                return res.status(200).json({
                    message: "Successfully updated book",
                    updateBook
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: `Failed to update the book`,
        });
    }
};


//==========================DELETE BOOKS========================

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
    let allBooks: any[] = [];

    try {
        const infos2 = fs.readFileSync(databaseFile, "utf-8");

        if (!infos2) {
            return res.status(400).json({
                message: `This book cannot be accessed`,
            });
        } else {
            allBooks = JSON.parse(infos2);
        }

        const {
            title,
            author,
            datePublished,
            description,
            pageCount,
            genre,
            bookId,
            publisher,
        } = req.body;

        let getBooks = allBooks.findIndex((a) => a.title === req.body.title);
        allBooks[getBooks] = req.body;

        let delBooks = allBooks.findIndex((a) => a.title === req.body.title) //check if you can add Index to addAllData
        allBooks.splice(delBooks, 1)

        fs.writeFile(databaseFile, JSON.stringify(allBooks, null, 2), "utf-8", (err) => {
            if (err) {
                return res.status(500).json({
                    message: `Failed to DEETE the book`,
                });
            } else {
                return res.status(200).json({
                    message: "File Deleted Successfully",
                    allBooks
                });
            }
        });
    } catch (err) {
        return res.status(500).json({
            message: `Failed to DELETE the book`,
        });
    }
};
