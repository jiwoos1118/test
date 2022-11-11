module.exports={
    HTML:function(body,authStatusUI='<a href="/auth/login">로그인</a>'){
        return `
        <!doctype html>
        <html>
        <head>
            <title> team3 </title>
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
                    <a class="navbar-brand" href="/">케이쉴드 주니어 A-3</a>
                </div>
                <div id="navbar" class="navbar-collapse collapse">
                    <ul class="nav navbar-nav">
                        <li class=""><a href="#" class="">공지사항</a>
                        </li>
                        <li class=""><a href="#" class="">자료실</a>
                        </li>
                        <li class=""><a href="#" class="">Q&A</a>
                        </li>
                        <li class=""><a href="/admin/index" class="">관리자 페이지</a>
                        </li>
                    </ul>
                    <ul class="nav navbar-nav navbar-right">
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
    }
}
