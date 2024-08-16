import express, { Express, Request, Response } from 'express'
import { PORT } from './config/app.conf'
import cors from 'cors'
import session from 'express-session'
import passport from 'passport'
import AuthController from './controllers/auth.controller'
import authentication from './middlewares/authentication'
import userController from './controllers/user.controller'
import contentController from './controllers/content.controller'
import articleController from './controllers/article.controller'
import { googleStrategy } from './libs/google-strategy'
import { facebookStrategy } from './libs/facebook-strategy'

const app: Express = express()
const appV1 = express.Router()
const port = PORT || 3000
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/v1', appV1)

appV1.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: 'SECRET',
    })
)
appV1.use(passport.initialize())
appV1.use(passport.session())

passport.use(googleStrategy())
passport.use(facebookStrategy())
passport.serializeUser(function (user: any, cb: (err: any, id?: any) => void) {
    cb(null, user)
})
passport.deserializeUser(function (obj: any, cb: (err: any, user?: any) => void) {
    cb(null, obj)
})

appV1.get('/', (req: Request, res: Response) => {
    res.send('Astronacci API.')
})

appV1.get('/user/me', authentication, userController.getLoggedUser)
appV1.post('/user/upgrade', authentication, userController.upgradeUser)
appV1.get('/contents', authentication, contentController.findAll)
appV1.get('/articles', authentication, articleController.findAll)

appV1.post('/auth/register', AuthController.register)
appV1.post('/auth/login', AuthController.login)

appV1.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
appV1.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/auth/login' }),
    AuthController.googleAuthCallback
)
appV1.get('/auth/google/login', AuthController.googleAuthLogin)

appV1.get(
    '/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['public_profile', 'email'],
    })
)
appV1.get(
    '/auth/facebook/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/auth/login',
    }),
    AuthController.facebookAuthCallback
)
appV1.get('/auth/facebook/login', AuthController.facebookLogin)

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`)
})
