const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Feedback = require("./feedbacks");
const Video = require("./videos");

const courseSchema = new Schema({
    title: String,
    description: String,
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
    published_date: {
        type: Date,
        default: Date.now()
    },
    instructor: String,
    videos: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Video'
        }
    ],
    feedbacks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Feedback'
        }
    ],
    enrollerd_users:[
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    view_count:{
        type: Number,
        default: 0
    }
});

courseSchema.post("findOneAndDelete", async (course) => {
    if (course) {
        await Feedback.deleteMany({ _id: { $in: course.feedbacks } });
        await Video.deleteMany({ _id: { $in: course.videos } });
    }
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;