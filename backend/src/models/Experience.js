import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: String,
  location: String,
  description: String,
  price: Number,
  image: String,
  about: String,
  slots: [
    {
      date: String,
      times: [
        {
          time: String,
          available: Number, // 0 means sold out
        },
      ],
    },
  ],
});

export default mongoose.model("Experience", experienceSchema);
