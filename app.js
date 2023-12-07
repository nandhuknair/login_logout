const express = require('express');
const path = require('path');
const app = express();
const session = require('express-session');

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

app.get('/',(req,res)=> {
    res.render('index',{message: ""});
})
app.get('/home',requireValidation,(req,res)=> {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.render('home')  
});
app.post('/login',(req,res)=> {
    const usernameDB = "Nandhu" ;
    const passwordDB = "12"
    const { username , password } = req.body 
    if(usernameDB === username && passwordDB === password ){
        req.session.username = username ;
        res.redirect('/home')
    }else{
        res.render('index',{message : "User name or password is invalid"})
    }

})

function requireValidation(req,res,next){
    if(req.session.username){
        next()
    }else{
        res.redirect('/');
    }
    
}

app.get('/logout',(req,res)=> {
    req.session.destroy((err)=>{
        if(err)console.log(err);
        res.redirect('/')
    })
})

const PORT = process.env.PORT || 9000
app.listen(PORT,(err)=>{
    if(err) console.log(err);
    console.log(`Server running successfully on the port ${PORT}`)
})