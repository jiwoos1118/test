var express=require('express');
var app=express();
var fs=require('fs');
var compression=require('compression');
app.use(compression());
var helmet=require('helmet');
app.use(helmet());

var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(express.static('public'));

var cookie=require('cookie-parser');
app.use(cookie());
var session=require('express-session');
var FileStore=require('session-file-store')(session);
app.use(session({
  secret:'secret',
  resave:false,
  saveUninitialized:true,
  store:new FileStore()
}));



var indexRouter=require('./routes/index');
var authRouter=require('./routes/auth');
var adminRouter=require('./routes/admin');



app.use('/',indexRouter);
app.use('/auth',authRouter);
app.use('/admin',adminRouter);

app.use(function(req,res,next){
  res.status(404).send('존재하지 않는 페이지');
});

app.use(function(err,req,res,next){
  console.error(err.stack)
  res.status(500).send('something broke');
});


app.listen(3333, function(){
  console.log('port : 3333');
});
