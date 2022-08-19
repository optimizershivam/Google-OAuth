const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
require('./passport');

const app = express();

app.set("view engine", "ejs")

app.use(cookieSession({
  name: 'google-auth-session',
  keys: ['key1', 'key2']
}))

const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        // res.sendStatus(401);
        res.render("unauthorized")
    }
}

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 8080

app.get("/", (req, res) => {
    res.render("home",{user:req.user})
})
app.get("/login",(req,res)=> {
    res.render("login", {user:req.user})
})
app.get("/profile",isLoggedIn,(req,res)=> {
    // console.log(req.user)
    res.render("profile",{user:req.user})
})


app.get("/failed", (req, res) => {
    res.send("Failed")
})
// app.get("/success",isLoggedIn, (req, res) => {
//     res.send(`Welcome ${req.user.email}`)
// })

app.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
    ));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failed',
    }),
    function (req, res) {
        res.redirect('/profile')

    }
);




app.get("/logout", (req, res) => {
    req.session = null;
    req.logout();
    res.redirect('/');
})
app.listen(port, () => console.log("server running on port" + port))