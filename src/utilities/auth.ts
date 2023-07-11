import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try{
    const authorisation = req.headers.authorization
    if(authorisation === undefined){
        return res.status(401).send({
            status: "ERROR",
            message: "You are not authorized"
        })
    }
    const pin = authorisation.split(" ")[1];
    if(!pin || pin === ""){
        return res.status(401).send({
            status: "ERROR",
            message: "Pin not found"
        })
    }
    const decoded = jwt.verify(pin, "alende")

    if("user" in req){
        req.user = decoded
    }

    return next()
    }catch(err){
        console.log(err)
    }
}