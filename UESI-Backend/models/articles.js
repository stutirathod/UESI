const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Feedback = require("./feedbacks");

const articleSchema = new Schema({
    title: String,
    content: String,
    published_date:{
        type:Date,
        default:Date.now()
    },
    approved:{
        type: Boolean,
        default: false
    },
    image:{
        path:{
            type: String,
            default: "https://cdn.builder.io/api/v1/image/assets/TEMP/4bcf9c85ac6fa22f081fb761b0729a5f8f94574caaaf63060b2b72c003557561?placeholderIfAbsent=true&apiKey=d3093260940f48a3bbd3cc8b0ff4e5c6"
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
    author:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    visited_count:{
        type: Number,
        default: 0
    }
});

articleSchema.post("findOneAndDelete", async (article) => {
    if (article) {
        await Feedback.deleteMany({ _id: { $in: article.feedbacks } });
    }
});

const Article = mongoose.model('Article',articleSchema);

module.exports = Article;