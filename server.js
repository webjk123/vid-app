var express = require('express');
var app = express();
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('passport');
var multer = require('multer');
var social = require('./app/passport/passport')(app,passport);
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true, parameterLimit:50000}));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

var storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null,'./images/');
  },
  filename: function(req, file, cb){
    if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
      var err = new Error();
      err.code = 'filetype';
      return cb(err);
    }
    else {
      cb (null,  Date.now() + '_' + file.originalname);
    }
  }
});

var upload = multer({
  storage: storage,
  limits: { fileSize:10000000 }
}).single('myfile');
app.post('/upload', function(req,res){
  upload(req,res, function(err){
    if(err){
      if(err.code === 'LIMIT_FILE_SIZE'){
        res.json({ success:false, message:'File size is too large. Max limit is 10MB'});
      }
      else if(err.code === 'filetype'){
        res.json({ success:false, message:'File type is invalid. must be .png'});
      }
      else{
        console.log(err);
        res.json({ success:false, message:'File was not able to be uploaded '});
      }}
      else{
        if(!req.file){
        res.json({ success:false, message:'No file was selected'});
       }
       else {
         res.json({ success:true, message:'File was uploaded'});
       }
      }
    });
});

var port = process.env.PORT || 3000;
mongoose.connect('mongodb://mongojk:mongo123@ds161190.mlab.com:61190/mongoecomm', function(err){
  if(err){
  console.log("Cannot connect to database " + err);
}
  else{
  console.log("Connect to database");
}
});
// mongoose.connect('mongodb://mongojk:mongo123@ds161190.mlab.com:61190/mongoecomm', function(err){
//   if(err){
//   console.log("Cannot connect to database " + err);
// }
//   else{
//   console.log("Connect to database");
// }
// });
// mongoose.connect('mongodb://mongojk:mongo123@ds161190.mlab.com:61190/mongoecomm', function(err){
//   if(err)
//   console.log("Cannot connect to database " + err)
//   console.log("Connect to database ")
// });

app.get('*',function(req,res){
  res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});
app.listen(port,function(err){
  if(err) console.log("Cannot connect to port" + err)
   console.log("Connected to port " + port);
});
