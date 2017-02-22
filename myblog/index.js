var path = require('path');
var express = require('express');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('config-lite');
var routes = require('./routes');
var pkg = require('./package');
var app = express();
//设置模板目录
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    name:config.session.key,
    secret:config.session.secret,
    resave:true,//强制更新session
    saveUninitialized:false,//设置为false,强制创建一个session，即使用户未登录
    cookie:{
        maxAge:config.session.maxAge//过期时间，过期后 cookie 中的 session id 自动删除
    },
    store:new MongoStore({
        url:config.mongodb
    })
}));
app.use(require('express-formidable')({
    uploadDir:path.join(__dirname,'public/img'),
    keepExtensions:true
}))
app.use(flash());
app.locals.blog={
    title:pkg.name,
    description:pkg.description
};
app.use(function(req,res,next){
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});
routes(app);
app.listen(config.port,function(){
    console.log(`${pkg.name} listening on port ${config.port}`);
});