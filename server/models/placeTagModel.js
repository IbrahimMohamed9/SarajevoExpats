const mongoose = require("mongoose");

const placeTagSchema = new mongoose.Schema(
  {
    type: { 
      type: String, 
      required: [true, "Please add the place type"],
      validate: {
        validator: async function (value) {
          const PlaceType = mongoose.model("PlaceTypes");
          const count = await PlaceType.countDocuments({ name: value });
          return count > 0;
        },
        message: "The specified place type does not exist in PlaceTypes collection",
      },
    },
    tag: { type: String, required: [true, "Please add a tag"], unique: true,trim: true }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Compound index to ensure uniqueness of type+tag combination
placeTagSchema.index({ type: 1, tag: 1 }, { unique: true });

const PlaceTag = mongoose.model("PlaceTags", placeTagSchema);
module.exports = PlaceTag;
