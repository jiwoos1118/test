var Client=require('mongodb').MongoClient;





module.exports={
    
    HTML:function(authStatusUI,body=
    `
        <div class="login-form">
            <h1>관리자 로그인</h1>
            <form action="/auth/login_process" method="POST">
                <input type="text" name="id" placeholder="아이디" required>
                <input type="password" name="pw" placeholder="비밀번호" required>
                
                <input type="submit" value="로그인">
            </form>
        </div>
    `){
        return `
        <!doctype html>
        <html>
        <head>
            <title> admin </title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
 
            <style>
            a {
                text-decoration:none;
                color : black;
            }
            .login-form {
                width: 600px;
                margin: 0 auto;
                font-family: Tahoma, Geneva, sans-serif;
            }
            .login-form h1 {
                text-align: center;
                color: #4d4d4d;
                font-size: 50px;
                padding: 20px 0 20px 0;
            }
            .login-form input[type="password"],
            .login-form input[type="text"] {
                font-size: 20px;
                width: 100%;
                height: 60px;
                padding: 15px;
                border: 1px solid #dddddd;
                margin-bottom: 15px;
                box-sizing:border-box;
            }
            .login-form input[type="submit"] {
                width: 100%;
                padding: 18px;
                background-color: #535b63;
                border: 0;
                box-sizing: border-box;
                cursor: pointer;
                font-weight: bold;
                color: #ffffff;
            }


            div.loginidpsw {
                width:100%;
                display:block;   
                padding : 10px 0;    
                text-align:right;         
            }

            </style>
        </head>


        <body>
        <nav class="navbar navbar-inverse navbar-static-top">
            <div class="container">
                <div class="navbar-header">
                    <a class="navbar-brand" href="/admin/index">관리자 페이지</a>
                </div>
                
                <div id="navbar" class="navbar-collapse collapse">
                
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="/">메인페이지</a>
                        <li>${authStatusUI}
                        </li>
                    </ul>
                </div>
                <!--/.navbar-collapse -->
            </div>
        </nav>
        ${body}
        
        </body>
        </html>
        `;
    },
    isAdmin:function(req, res) {
        if (req.session.is_admin) {
            return true;
        } else {
            return false;
        }
    },

    info:function(doc){

        var inform='';

        for (var i=0; i<doc.length; i++){
            inform+="<tr><td>"+doc[i].id+"</td><td>"+doc[i].pw+"</td><td>"+doc[i].name+"</td><td>"+doc[i].email+"</td><td>"+doc[i].tel+"</td></tr>"
        }

        body= `
            <div class="panel panel-default">
            <!-- Default panel contents -->
            <div class="panel-heading">user DB</div>

            <!-- Table -->
            <table class="table">
          
            
            <tr>
                <th>id</th>
                <th>pw</th>
                <th>name</th>
                <th>email</th>
                <th>tel</th>
            </tr>
            ${inform}

            </table>
            </div>
        `;

        return body;
    },
  
    statusUI:function(req, res) {
        var authStatusUI='';
        
        var body=`
        <div class="login-form">
            <h1>관리자 로그인</h1>
            <form action="/admin/admin_process" method="POST">
                <input type="text" name="id" placeholder="아이디" required>
                <input type="password" name="pw" placeholder="비밀번호" required>
                
                <input type="submit" value="로그인">
            </form>
        </div>
        `
        
       
        if (this.isAdmin(req, res)) {
    
            authStatusUI=`
            <a>${req.session.id}</a> 
            <li><a href="/admin/logout" class="">로그아웃</a>
            `;
        }
        var result=[authStatusUI,body];
        return result;
    }
}
