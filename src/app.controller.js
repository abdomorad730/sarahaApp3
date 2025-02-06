import ConnectionDB from "./db/DBconnection.js"
import messageRouter from "./modules/messages/messages.controller.js"
import userRouter from "./modules/Users/user.controller.js"
import cors from 'cors'

const bootstrap = (app, express) => {
    app.use(cors())

    app.use(express.json())

    ConnectionDB()
    app.use('/users', userRouter)
    app.use('/messages', messageRouter)
    app.get('/', (req, res, next) => {
        return res.status(200).json({ msg: 'Hello World!' })
    })

    app.use('*', (req, res, next) => {
        return next(new Error(`page not fonud ${req.originalUrl}`))
    })

    app.use((err, req, res, next) => {
        return res.status(400).json({
            message: err.message,
            stack: err.stack
        })

    })
}
export default bootstrap