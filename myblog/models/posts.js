var Post = require('../lib/mongo').Post;
var tool = require('../models/tool');
module.exports = {
    create:function create(post,callback){
          Post.create(post,callback);
    },
     getPostById:function(postId,callback){
        Post
        .findOne({_id:postId})
        .populate({path:'author',model:'User'})
        .exec(function(err,res){
          tool.addTimeStamp(res);
          tool.contentToHtml(res);
          console.log(res);
          callback(err,res);
        });
    },
  // 按创建时间降序获取所有用户文章或者某个特定用户的所有文章
     getPosts:function(author,callback){
         var query = {};
         if(author){
             query.author = author;
         }
        Post
        .find(query)
        .populate({path:'author',model:'User'})
        .sort({_id:-1})
        .exec(function(err,res){
              tool.addTimeStamp(res);
              tool.contentToHtml(res);
              callback(err,res);
        });
     },
     incPv:function(postId,callback){
           Post.update({_id:postId},{$inc:{pv:1}})
           .exec(callback);
     }

}