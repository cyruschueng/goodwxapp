var async = require('async');

var stepmodel=require("./../../../../data/model").activityStepDataModel;
var usermodel=require("./../../../../routes/2017/6/robam/model.js").robam_user_model;


usermodel.find({},{"calories":1,"userId":1}).exec(function (err, result) {
  async.mapLimit(
    result,
    1,
    function (item,cb) {
      console.log(item.userId);
      stepmodel.aggregate([
        { $match: {
          userId:item.userId,
          date: {"$in": ['2017-06-08','2017-06-09']}
        }},
        {
          $group: {
            _id:null,
            count: {$sum: "$calories"}
          }
        }
      ],function (err,totaldata) {
        // console.log(totaldata);
        if(err){
          return cb(err)
        }
        // console.log(totaldata);
        if(totaldata.length>0){
          usermodel.update(
            {userId:item.userId},
            {$set:{
              calories:totaldata[0].count,
            }},function(err){
              cb(err)
            })
        }else {
          cb(null);
        }





      })

    },
    function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log('data ok ~');
      }
      process.exit();
    }
  )
})





