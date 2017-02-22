var marked = require('marked');
var moment = require('moment');
var objectIdToTimestamp = require('objectid-to-timestamp');
module.exports = {
    contentToHtml:function(_post){//文章用可用marked编辑
            if(_post instanceof Array){
                _post.map(function(post){
                    post.content = marked(post.content);
                    return post;
                });
            }else{
                _post.content = marked(_post.content);
            }
            
    },
   addTimeStamp:function(result){//通过_id获取时间
            if(!result) return;
            if(result instanceof Array){
                    result.forEach(function(item){
                        item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
                    });
            }else{
                    result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
            }
            return result;
        }
        
}