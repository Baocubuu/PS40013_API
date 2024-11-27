const mogoose = require("mongoose");
//schema = collection
const schema = mogoose.Schema;
const ObjectId = schema.ObjectId;
const use = new schema({
    id:{type:ObjectId},
    username:{type:String,require:true,unique:true,trim:true,default:'No user'
    },
    password:{type:String},
    fullname:{type:String}
});
module.exports=mogoose.model.user || mogoose.model("user",use);