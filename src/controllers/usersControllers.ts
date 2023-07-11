import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import jwt from 'jsonwebtoken';

let databaseFolder = path.join(__dirname, "../../src/userDatabase")
let databaseFile = path.join(databaseFolder, "userDatabase.json")

// ==========================CREATE USER========================

export const createUser = async(req:Request, res: Response, next: NextFunction) => {
try{
    //   create database dynamically
    if(!fs.existsSync(databaseFolder)){
        fs.mkdirSync(databaseFolder)
    }
    if(!fs.existsSync(databaseFile)){
        fs.writeFileSync(databaseFile, " ")
    }

    // read from database
    let databaseRead: any[] = [];
    try{
         const infos = fs.readFileSync(databaseFile, 'utf8')
         if(!infos){
            return res.status(404).json({
                message: `Error reading from database`
            })
         }else {
            databaseRead = JSON.parse(infos)
         }
    }catch(parseError){
        databaseRead = [];
    }

    //    read from frontend
    const { userName, email, password } = req.body;

    // check if the user exists
    const existingUserEmail = databaseRead.find((user:any) => user.email === email)

    if(existingUserEmail){
        return res.send({
            message: `The email is already in use`
        })
    }

    const saltLength = 10;
    const salt = await bcrypt.genSalt(saltLength);
    const hash = await bcrypt.hash(password, salt);

    // create the user
    const newUser = {
        "id": v4(),
        "userName": userName,
        "email": email,
        "password": hash,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }

    databaseRead.push(newUser)

    fs.writeFileSync(databaseFile, JSON.stringify(databaseRead, null, 2), 'utf-8')

    return res.status(200).json({
        message: `User created successfully`,
        newUser
    })

}catch(err){
    console.log(err)
}
}
// ==========================LOGIN USER========================


export const login = async (req: Request, res: Response, next: NextFunction) => {
    try{
        // read from database
        let readDatabase:any[] = [];
        const infos = fs.readFileSync(databaseFile, 'utf-8')
        if(!infos){
            return res.status(404).json({
                message: `Error reading Database`
            })
        }else{
            readDatabase = JSON.parse(infos);
        }

        // read from frontend
        const { email, password } = req.body;
        const thisUser = readDatabase.find((user:any) => user.email === email)

        if(!thisUser){
            return res.send({
                message: "User does not exist"
            })
        }
        if(thisUser){
            const validate = await bcrypt.compare(password, thisUser.password)
        if(validate){
            const token = jwt.sign(thisUser, "alende")
            return res.status(200).json({
                message: 'Login Successful',
                email: thisUser.email,
                token
            })
        }else{
            return res.send({
                message: "Access Denied"
            })
        }
        }

    }catch(err){
        console.log(err)
    }
}