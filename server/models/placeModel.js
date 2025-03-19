const mongoose = require("mongoose");
const PlaceType = require("./placeTypeModel");

const placeSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "please add the title"] },
    content: { type: String, required: [true, "please add the content"] },
    pictures: { type: [String], required: [true, "Please add the picture"] },
    pictureDescription: { type: String },
    phone: { type: String },
    email: { type: String },
    website: { type: String },
    link: { type: String, required: [true, "please add the link"] },
    priority: { type: Number, default: 0 },
    pinned: { type: Boolean, default: false },
    tags: { type: [String], default: [] },
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
    versionKey: false,
  }
);

const Place = mongoose.model("Places", placeSchema);
module.exports = Place;
