const mongoose=require('mongoose');

const roomSchema=new mongoose.Schema({
    hotelId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hotel',    
    required:true
    },
    roomNumber:{    
        type:Number,
        required:true,
    },
    roomType:{
        type:String,
        enum:[
        "SINGLE",
        "DOUBLE",
        "DELUXE",
        "SUITE",
        "FAMILY",
      ],
        required:true
    },
    description:{
        type:String,
        required:true
    },
    pricePerNight:{
        type:Number,
        required:true, 
        min:0
    },
    amenities:{
        type:[String],
        default:[]

    },
    capacity:{
        type:Number,
        required:true,
        min:1
    },
    bedType:{
        type:String,
        enum:[
            "SINGLE",
            "DOUBLE",
            "QUEEN",
            "KING"
        ],
        required:true
    },
    images:{
        type:[String],
        default:[]
    },
    status:{
        type:String,
        enum:["AVAILABLE","BOOKED","MAINTENANCE"],
        default:"AVAILABLE"
    }
},{
    timestamps:true
});

const Room=mongoose.model('Room',roomSchema);

module.exports=Room;