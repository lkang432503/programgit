var User = require('../lib/mongo').User;
var addTimeStamp = require('../models/tool').addTimeStamp;
module.exports = {
    create:function(user,callback){
        User.create(user,callback);
    },
    getUserByName:function(name,callback){
        User
        .findOne({name:name})
        .exec(function(err,res){
            console.log(res);
          addTimeStamp(res);
          callback(err,res);
        });
    }
}