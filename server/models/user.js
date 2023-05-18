import mongoose,{Schema} from "mongoose";

const userSchema= new Schema(
    {
        name:{
            type:String,
            required:true,
        },
        username:{
            type:String,
            required:true,
            unique:true,
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
        },
        isAdmin:{
            type:Boolean,
            required:false,
        },
        recipe:{
            type:[{
                id:{type: String},
                name:{type: String},
                img:{type:String},
                ingr:{type:[String]},
                
            }]  
        },      

    }
    , {timestamps:true}
)
export default mongoose.model("User",userSchema);