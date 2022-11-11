module.exports = {
    isOwner:function(req, res) {
        if (req.session.is_logined) {
            return true;
        } else {
            return false;
        }
    },
    statusUI:function(req, res) {
        var authStatusUI = `
        <a href="/auth/login" class="">로그인</a>
        <li><a href="/auth/register" class="">회원가입</a>
        `
        if (this.isOwner(req, res)) {
            authStatusUI = `
            <a class="">${req.session.id}</a>
            <li><a href="/auth/logout" class="">로그아웃</a>
            `
        }
        return authStatusUI;
    }
}