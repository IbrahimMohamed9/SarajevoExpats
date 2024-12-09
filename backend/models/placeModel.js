const mongoose = require("mongoose");
const PlaceType = require("./placeTypeModel");

const placeSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "please add the title"] },
    content: { type: String, required: [true, "please add the content"] },
    picture: { type: String, required: [true, "please add the picture"] },
    pictureDescription: { type: String },
    phone: { type: String },
    email: { type: String },
    link: { type: String, required: [true, "please add the link"] },
    type: {
      type: String,
      required: [true, "please add the type"],
      validate: {
        validator: async function (value) {
          const count = await PlaceType.countDocuments({ name: value });
          return count > 0;
        },
        message: "The specified type does not exist in PlaceTypes collection",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Place = mongoose.model("Places", placeSchema);
module.exports = Place;
