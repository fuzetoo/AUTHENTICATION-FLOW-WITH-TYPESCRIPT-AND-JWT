import { NextFunction, Request, Response } from "express"
import { decode, verify } from "jsonwebtoken"

type TokenPayLoad = {
    id: string
    iat: number
    exp: number
}

export function AuthMiddlewares(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers

    if (!auth || !auth.authorization) {
        return res.json({ error: "Token not found!" })
    }

    const [, token] = auth.authorization.split(" ")

    try {
        const decoded = verify(token, "fuzetoSECRET")
        const { id } = decoded as TokenPayLoad
        req.userId = id
    } catch (error) {
        return res.status(401).json({ error: "Invalid token" })
    }

    next()
}
