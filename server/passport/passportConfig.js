const {
  CLIENT_SLACK_ID,
  CLIENT_SLACK_SECRET
} = process.env
const SlackStrategy = require('passport-slack').Strategy
const passport = require('passport')
const refresh = require('passport-oauth2-refresh')

// setup the strategy using defaults
passport.use(
  new SlackStrategy(
    {
      clientID: CLIENT_SLACK_ID,
      clientSecret: CLIENT_SLACK_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      // optionally persist profile data
      const { id } = profile
      const user = {
        accessToken,
        refreshToken,
        id,
        profile
      }
      // console.log('in pp callback')
      //  console.log(user)
      done(null, user)
    }
  )
)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

module.exports = passport
