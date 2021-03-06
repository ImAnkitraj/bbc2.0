var song= require("../models/song");
var payment= require("../models/payment");
//all the middleware
var middlewareobj={};
middlewareobj.checksongownership = function(req, res, next){
        //is user logged in
        if(req.isAuthenticated()){
            song.findById(req.params.id, function(err, foundsong){
                if(err){
                    req.flash("error",err);
                    res.redirect("back");
                }
                else{
                     //does he owns it
                     if(foundsong.author.id.equals(req.user._id)){
                       next();
                     }
                     else{
                        req.flash("error","You don't have the permission to do that");
                        res.redirect("back");
                     }
                }
              });
        }
        else{
           req.flash("error","You need to be Logged in to do that");
           res.redirect("back");
        }
}
middlewareobj.checkpaymentownership = function(req, res, next){
        //is user logged in
        if(req.isAuthenticated()){
            payment.findById(req.params.payment_id, function(err, foundpayment){
                if(err){
                    res.redirect("back");
                }
                else{
                     //does he owns it
                     if(foundpayment.author.id.equals(req.user._id)){
                       next();
                     }
                     else{
                        req.flash("error","You don't have permission to do that");
                        res.redirect("back");
                     }
                }
              });
        }
        else{
           req.flash("error","You need to be logged in to do that");
           res.redirect("back");
        }
}


middlewareobj.isloggedin = function(req, res, next){
    if(req.isAuthenticated()){
          return next();
    }
    req.flash("error", "You need to be Logged in to do that!")
    res.redirect("/login");
}
module.exports= middlewareobj;