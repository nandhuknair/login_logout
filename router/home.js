const express = require('express');
const router = express.Router();

//Really this is /home 
const auth =(req,res,next)=> {
    if(req.session.isAuthenticated){
        next()
    }else{
        res.redirect("/login")
    };
}

router.get('/',auth,(req,res)=> {
     res.render('home');
})
  


module.exports = router