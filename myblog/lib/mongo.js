var config = require('config-lite');
var Mongoose = require('mongoose');
// var moment = require('moment');
// var objectIdToTimestamp = require('objectid-to-timestamp');

Mongoose.connect(config.mongodb);
var Schema = Mongoose.Schema;
var UserSechma = new Schema({
  name: { type: 'string' },
  password: { type: 'string' },
  avatar: { type: 'string' },
  gender: { type: 'string', enum: ['m', 'f', 'x'] },
  bio: { type: 'string' }
});
UserSechma.index({name:1},{unique:true});

exports.User = Mongoose.model('User',UserSechma);
// exports.User.addTimeStamp = function(result){
//       if(!result) return;
//     if(result instanceof Array){
//             result.forEach(function(item){
//                 item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
//             });
//     }else{
//             result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
//     }
// }
var PostSechma = new Schema({
  author: { type: Schema.Types.ObjectId },
  title: { type: 'string' },
  content: { type: 'string' },
  pv: { type: 'number' }
});
PostSechma.index({author:1,_id:-1});
exports.Post = Mongoose.model('Post',PostSechma);
// Mongoose.plugin('addCreateAt',{
//     afterFind:function(results){
//         results.forEach(function(item){
//             item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
//         });
//         return results;
//     },
//     afterFindOne:function(result){
//         if(result){
//             result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
//         }
//         return result;
//     }
// })

