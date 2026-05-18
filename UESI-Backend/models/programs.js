const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Feedback = require("./feedbacks");

const programSchema = new Schema({
    title: String,
    description: String,
    start_date: Date,
    end_date: Date,
    status:{
        type: String,
        default: 'Active',
    },
    location:String,
    image:{
        path:{
            type: String,
            default: "https://cdn.builder.io/api/v1/image/assets/TEMP/d52d7f23f9bed35860e555c40aad1cb5c31688cda7e77d82a289355751602784?placeholderIfAbsent=true&apiKey=d3093260940f48a3bbd3cc8b0ff4e5c6"
        },
        filename:{
            type: String,
            default: "defaultImage"
        }
    },
    feedbacks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ],
    registeredUsers: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            time: {
                type: Date,
                default: Date.now
            }
        }
    ],
    geometry: {
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            // required: true
        },
        coordinates: {
            type: [Number],
            // required: true
        }
    },
});

programSchema.post("findOneAndDelete", async (program) => {
    if (program) {
        await Feedback.deleteMany({ _id: { $in: program.feedbacks } });
    }
});
const Program = mongoose.model('Program',programSchema);

module.exports = Program;