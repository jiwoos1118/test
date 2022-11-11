var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');
var template=require('../public/main.js');
var Client=require('mongodb').MongoClient;



router.get('/login', function(req, res){
    var html=template.HTML(`
    
        <div class="login-form">
            <h1>로그인</h1>
            <form action="/auth/login_process" method="POST">
                <input type="text" name="id" placeholder="아이디" required>
                <input type="password" name="pw" placeholder="비밀번호" required>
                    <div class="loginidpsw">
                        <a href="/auth/register">회원가입 | </a>
                        <a href="#">아이디/비밀번호 찾기 </a>
                    </div>
                <input type="submit" value="로그인">
            </form>
        </div>

    `,'');
   
    

    res.send(html);
});


router.post("/login_process", function(req, ress){
    console.log("> 로그인 함수");

    Client.connect('mongodb://localhost:27017/db', function(error, db){
        if (error){
            console.log(error);
        }
        else {
            var dbo=db.db("test");
            console.log("> connected db");
            
            //**nosql 
            var query={id:req.body.id,pw:req.body.pw};
            console.log(query);
            //query={id:{$ne:null},pw:req.body.pw};
            
            //매개변수를 문자열로 해석함, 문자열이 아닌 쿼리로 전달해야 함
            
            var cursor=dbo.collection("user").find(query).toArray(function(err,res){
                if(err) console.log(err)
                else {
                    console.log(res);
                    if (res!=false){
                        console.log('로그인 성공');
                        req.session.is_logined=true;
                        req.session.id=req.body.id;
                        req.session.save(function(){
                            ress.redirect('/');
                        });
                    }
                    else {
                        console.log('> 로그인 실패');
                        //로그인실패 script문 작성
                        ress.redirect('/auth/login');
                    }
                    
                }
                db.close();
            });
        }
        
    });


 
});

router.get('/logout', function(req,res){
    req.session.destroy(function(err){
        res.redirect('/');
    });
});

router.get('/register', function(req, res){
    var html=template.HTML(`
    
        <div class="login-form">
            <h1>회원가입</h1>
            <form action="/auth/register_process" method="POST">
                <input type="text" name="id" placeholder="아이디" required>
                <input type="password" name="pw" placeholder="비밀번호" required>
                <input type="password" name="pw2" placeholder="비밀번호 확인" required>
                <input type="text" name="name" placeholder="이름" required>
                <input type="text" name="email" placeholder="이메일" required>
                <input type="text" name="tel" placeholder="전화번호" required>
                
                <input type="submit" value="회원가입">
            </form>
        </div>

    `,'');
    res.send(html);
});


router.post('/register_process', function (req, res) {
    var post = req.body;
    var id = post.id;
    var pw = post.pw;
    var pw2 = post.pw2;
    var name = post.name;
    var email = post.email;
    var tel = post.tel;


 
    if (pw!=pw2){ //비밀번호 확인이 맞지 않을 때
        res.redirect('/auth/register');
        res.send("<script>alert('incorrect passwd');</script>");
    }
    else {

        Client.connect('mongodb://localhost:27017/db', function(error, db){
            if (error){
                console.log(error);
            }
            
            var dbo=db.db("test");
            console.log("connected "+db);
                
            var query={id:id};
            var cursor=dbo.collection("user").find(query).toArray(function(err,doc){
                if(err) throw err;
                    
                console.log(doc);
                if (doc!=false){ //중복
                    console.log('이미 존재하는 계정');
                    db.close();
                    return res.redirect('/auth/register');
                    //res.send("<script>alert('already exist');</script>");
                }
            });
            var myobj=[
                {id:id,pw:pw,name:name,email:email,tel:tel}
            ];
            var cursor2=dbo.collection("user").insertMany(myobj, function(err2,doc2){
                if (err2) throw err2;
                console.log(doc2);
                res.redirect('/auth/login');
                db.close();
            }); 
        });
                     
    }
});

module.exports=router;
  