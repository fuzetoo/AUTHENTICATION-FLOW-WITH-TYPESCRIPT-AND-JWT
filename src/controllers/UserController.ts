import { Request, Response } from "express"
import { prisma } from "../utils/prisma"
import { hash } from "bcryptjs"

export class UserController {
    async users(req: Request, res: Response) {
        const users = await prisma.user.findMany()
        return res.json({ users })
    }
    async create(req: Request, res: Response) {
        const { name, email, password } = req.body

        const userExists = await prisma.user.findUnique({ where: { email } })

        if (userExists) {
            return res.json({ error: "User already exists" })
        }

        const hashPassword = await hash(password, 8)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashPassword,
            }
        })

        return res.json({ user })
    }
}
