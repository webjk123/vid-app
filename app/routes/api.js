var User = require('../models/user');
var insvidimg = require('../models/addi');
var Addvidtype = require('../models/videotype');

var multer = require('multer');
var jwt =require('jsonwebtoken');
var secret = "jatinkaushal";

module.exports=function(router){
  router.post('/new',function(req,res){
    User.findOne({username:req.body.username}).select('username email password').exec(function(err,userr){
     console.log(userr);
      if(err) throw err;
    var token = jwt.sign({username:userr.username,email:userr.email},secret,{expiresIn:'24h'});
    res.json({success:true, message: "User authenticated", token: token});

});
  });


//Register
router.post('/users', function(req,res){
  var user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.name = req.body.name;
if(req.body.username==null || req.body.username=='' || req.body.password==null || req.body.password=='' || req.body.email==null || req.body.email==''
|| req.body.name==null || req.body.name=='' )
  {
  res.json({success:false,message:"Please fill all the details"});
  }
else{
  user.save(function(err){

    if(err){
   if(err.errors != null){
    if(err.errors.name){
      res.json({success:false,message:err.errors.name.message});
    }
    else if(err.errors.email){
      res.json({success:false,message:err.errors.email.message});
    }
    else if(err.errors.username){
      res.json({success:false,message:err.errors.username.message});
    }
    else if(err.errors.password){
      res.json({success:false,message:err.errors.password.message});
    }
    else{
      res.json({ success: false, message: err});
    }
  } else if(err){
    var x= err.errmsg.split("index:")[1].split("dup key")[0].split("_")[0];

 if(x){
  res.json({success:false,message:'This ' + x + 'already present'});
}

}
else{
            res.json({success:false,message:err});
    }}
    else{
      res.json({success:true,message:"user created"});
        }
  });
}
});
router.get('/allvide',function(req,res){
  insvidimg.find({}).exec(function(err,user){
    if(err) throw err;
    else if(user){
    res.json(user);
    }
});
});



router.post('/addvidtype', function(req,res){
  var uservid = new Addvidtype();
  uservid.vidtype = req.body.vidtype;

  if(req.body.vidtype==null || req.body.vidtype=='')
  {
  res.json({success:false,message:"Please Provide details"});
  }
else{
  uservid.save(function(err){

    if(err){
   if(err.errors != null){
    if(err.errors.vidtype){
      res.json({success:false,message:err.errors.vidtype.message});
    }

    // else{
    //   res.json({ success: false, message: err});
    // }
//   } else if(err){
//  //    var x= err.errmsg.split("index:")[1].split("dup key")[0].split("_")[0];
//  //
//  // if(x){
//  //  res.json({success:false,message:x + ' Not Present'});
// }

}
else{
          res.json({success:false,message:err});
    }
}
    else{
      res.json({success:true,message:"user created"});
        }
  });
}
});
router.post('/authenticate',function(req,res){
  User.findOne({username:req.body.username}).select('username email password').exec(function(err,user){
    if(err) throw err;
    if(!user){
      res.json({success:false, message:"Username/Password is not correct"});
    }
   else if(user){
     if(req.body.password){
       var validPassword= user.comparePassword(req.body.password);
     }
    else {
      res.json({success:false, message:"Please enter password"});
    }
   if(!validPassword){
       res.json({success:false, message:"Please enter correct password"});
   }
else {
  var token = jwt.sign({username:user.username,email:user.email},secret,{expiresIn:'24h'});
  res.json({success:true, message: "User authenticated", token: token});
}
   }
 });
});
router.use(function(req,res,next){
  var token = req.body.token || req.body.query || req.headers['x-access-token'];
  if(token){
    jwt.verify(token,secret,function(err, decoded){
      if(err){
        res.json({success:false, message:'Token Invalid'});
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else{
    res.json({success:false, message: 'No token provided / Please Login'});
  }
});

router.post('/me',function(req,res){
  res.send(req.decoded);
});
router.get('/allvid',function(req,res){
  User.find({}).exec(function(err,user){
    if(err) throw err;
    else if(user){
    res.json(user);
    }
});
});
router.get('/allvidetyp',function(req,res){
  Addvidtype.find({}).exec(function(err,user){
    if(err) throw err;
    else if(user){
    res.json(user);
    }
});
});





router.post('/addusers', function(req,res){
  var user = new insvidimg();
  user.imgpath = req.body.imgpath;
  user.vlink = req.body.vlink;
  user.sitem = req.body.sitem;
  user.piccaption = req.body.piccaption
  if(req.body.imgpath==null || req.body.imgpath=='' || req.body.vlink==null || req.body.vlink=='' || req.body.sitem==null || req.body.sitem=='' || req.body.piccaption==null || req.body.piccaption=='')
  {
res.json({success:false,message:"Please Fill all the details"});
  }
else{
  user.save(function(err){
  if(err){
    if(err.errors != null){
    if(err.errors.imgpath){
      res.json({success:false,message:err.errors.imgpath.message});
    }
    else if(err.errors.vlink){
      res.json({success:false,message:err.errors.vlink.message});
    }

    else if(err.errors.sitem){
      res.json({success:false,message:err.errors.sitem.message});
    }
    else if(err.errors.piccaption){
      res.json({success:false,message:err.errors.piccaption.message});
    }
    // else{
    //   res.json({ success: false, message: err});
    // }
//   } else if(err){
//  //    var x= err.errmsg.split("index:")[1].split("dup key")[0].split("_")[0];
//  //
//  // if(x){
//  //  res.json({success:false,message:x + ' Not Present'});
// }

}
else{
          res.json({success:false,message:err});
        }
}
    else{

      res.json({success:true,message:"user created"});
        }
  });
}
});


return router;
}
