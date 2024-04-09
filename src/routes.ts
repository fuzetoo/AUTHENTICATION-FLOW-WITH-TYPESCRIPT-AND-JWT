import {Router} from 'express'
import { UserController } from './controllers/UserController'
import { AuthController } from './controllers/AuthController'
import { AuthMiddlewares } from './middlewares/auth'


const usercontroller = new UserController()
const authController = new AuthController()

export const router = Router()

router.get("/ping", async (req, res ) => {
    return res.json('Pong!')
})

router.post("/create", usercontroller.create)
router.get("/users", AuthMiddlewares, usercontroller.users )
router.post("/login", authController.authenticate)