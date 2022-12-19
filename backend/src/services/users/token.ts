import { Response, Request, NextFunction } from "express";
import  jwt from "jsonwebtoken"

export const verifyToken = (req: Request, res: Response, next?: NextFunction)=> {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET , (err, user) => {
        if (err) res.status(403).json("Token is not valid!");
        req['user'] = user;
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  };

export const verifyTokenAndAuthorization = (req: Request, res: Response, next?: NextFunction) => {
    verifyToken(req, res, () => {
      if (req['user'].permission === req.params.permission || req['user'].isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };

export  const verifyTokenAndAdmin = (req: Request, res: Response, next?: NextFunction) => {
    verifyToken(req, res, () => {
      if (req['user'].isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
  