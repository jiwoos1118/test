var express = require('express');
var router = express.Router();
var template=require('../public/main.js');
var auth=require('../public/auth')


router.get('/', function(req, res){
    var html=template.HTML(`
    <div class="row text-center" style="width: 100%">
        <div style="width: 30%; float:none; margin:0 auto" >
        <img src="/data/logo.png" width="100">
        
        <h3>image viewer</h3>
        <form method="POST">
            <div class="form-group">
            <label for="url">url</label>
            <input type="text" class="form-control" id="url" placeholder="url" name="url" value="" required>
            </div>
            <button type="submit" class="btn btn-default">View</button>
        </form>
        </div>
    </div>
 
    `, auth.statusUI(req,res));
    res.send(html);
});



module.exports=router;