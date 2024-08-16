import { GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from './../config/app.conf'

const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy

export function googleStrategy() {
    return new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_CALLBACK_URL,
        },
        function (
            accessToken: string,
            refreshToken: string,
            profile: any,
            done: (err: any, user?: any) => void
        ) {
            return done(null, profile)
        }
    )
}
