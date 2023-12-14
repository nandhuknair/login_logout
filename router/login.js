const express = require('express');
const router = express.Router();



// Middleware to prevent access to login page if already authenticated
const redirectToHomeIfAuthenticated = (req, res, next) => {
    if (req.session.isAuthenticated) {
        res.redirect('/home');
    } else {
        next();
    }
}

router.get('/',redirectToHomeIfAuthenticated ,(req,res)=> {
    res.render('index',{message : ""});
})  



router.post('/',(req,res)=> {

    const usernameDB = "Nandhu" ;
    const passwordDB = '1';
    const {username,password} = req.body

    if(usernameDB === username && passwordDB === password){
        req.session.username = username ;
        req.session.isAuthenticated = true ;
        res.redirect('/home')
    }else{
        res.render('index',{message : "Invalid password or username"});
    }
})    

module.exports = router


