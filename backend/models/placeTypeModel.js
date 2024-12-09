const mongoose = require("mongoose");

const placeTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  {
    timestamps: true,
  }
);

// Pre-update middleware to check for duplicate names
placeTypeSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate().$set || this.getUpdate();

    if (!update.name) {
      next();
    }

    const exists = await mongoose.models("PlaceTypes").findOne({
      name: update.name,
      _id: { $ne: this._id },
    });
    if (exists) {
      throw new Error("A place type with the same name already exists");
    }

    await this.model("PlaceTypes").updateMany(
      { _id: this._id },
      { name: update.name }
    );

    console.log("Place type updated successfully");

    next();
  } catch (err) {
    next(err);
    console.error(err);
  }
});

const PlaceType = mongoose.model("PlaceTypes", placeTypeSchema);
module.exports = PlaceType;
