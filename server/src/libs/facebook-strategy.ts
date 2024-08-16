import {
    FACEBOOK_APP_ID,
    FACEBOOK_APP_SECRET,
    FACEBOOK_CALLBACK_URL,
    GOOGLE_CALLBACK_URL,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    PORT,
} from './../config/app.conf'

const FacebookStrategy = require('passport-facebook').Strategy

export function facebookStrategy() {
    return new FacebookStrategy(
        {
            clientID: FACEBOOK_APP_ID,
            clientSecret: FACEBOOK_APP_SECRET,
            callbackURL: FACEBOOK_CALLBACK_URL,
            scope: ['email', 'public_profile'],
            profileFields: ['email', 'name', 'id'],
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
