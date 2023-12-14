
const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');
const homeRouter = require('./router/home.js');
const loginRouter = require('./router/login.js');
const logoutRouter = require('./router/logout.js');

app.use((req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
  });

app.use(session(
    {
         secret: 'your-secret-key',
         resave: false,
         saveUninitialized: true
        
    }
));

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname,"public")));     
app.use(express.json())
app.use(express.urlencoded({extended:true}));


app.use('/home',homeRouter);
app.use('/login',loginRouter);
app.use('/logout',logoutRouter);


const PORT = process.env.PORT || 9000
app.listen(PORT,(err)=>{
    if(err) console.log(err);
    console.log(`Server running successfully on the port ${PORT}`)
})























