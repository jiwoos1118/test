var express = require('express');
var router = express.Router();
var template=require('../public/admin.js');

var Client=require('mongodb').MongoClient;

router.get('/index', function(req, res){

    if (req.session.is_admin){
        Client.connect('mongodb://localhost:27017/db', function(error, db){
        if (error) throw error;
            
        var dbo=db.db("test");
        console.log("connected "+db);
                
        var cursor=dbo.collection("user").find({}).toArray(function(err,doc){
            if(err) throw err;

            var inform=template.info(doc);
        
            var html=template.HTML(template.statusUI(req,res)[0],inform);
            res.send(html);

            db.close();
        })

        
    })}

    else {
        var html=template.HTML(template.statusUI(req,res)[0],template.statusUI(req,res)[1]);
        res.send(html);
    }
    
  
});

router.post('/admin_process',function(req,res){
    var id=req.body.id;
    var pw=req.body.pw;

    Client.connect('mongodb://localhost:27017/db', function(error, db){
        if (error) throw error;
            
        var dbo=db.db("test");
        console.log("connected "+db);
                
        var query={id:id, pw:pw};
        var cursor=dbo.collection("admin").find(query).toArray(function(err,doc){
            if(err) throw err;
            
            console.log(doc);
            if (doc!=false){ 
                req.session.is_admin=true;
                req.session.id=id;
                req.session.save(function(){
                    res.redirect('/admin/index');
                });
            }
            else {
                console.log("계정정보가 올바르지 않음");
                res.redirect("/admin/index")
            }

            db.close();
        }); 

        
    });
  
    
});


router.get('/logout', function(req,res){
    req.session.destroy(function(err){
        res.redirect('/admin/index');
    });
});




module.exports=router;