import { Request, Response } from "express"
import { prisma } from "../utils/prisma"
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"

export class AuthController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body
        const user = await prisma.user.findUnique({ where: { email } })

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const isPasswordValid = await compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Invalid password" })
        }

        const token = sign({ id: user.id }, "fuzetoSECRET", { expiresIn: "3h" })

        return res.json({ user, token })
    }
}
