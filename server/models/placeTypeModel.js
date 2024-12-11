const mongoose = require("mongoose");

const placeTypeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

placeTypeSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate().$set;
    const oldData = await PlaceType.findOne(this._conditions);

    if (!update.name || oldData.name === update.name) {
      return next();
    }

    const exists = await this.model.findOne({
      name: update.name,
    });
    if (exists) {
      throw new Error("A place type with the same name already exists");
    }

    const Place = mongoose.model("Places");

    await Place.updateMany(
      { type: oldData.name },
      { $set: { type: update.name } }
    );

    next();
  } catch (err) {
    next(err);
    console.error(err);
  }
});

const PlaceType = mongoose.model("PlaceTypes", placeTypeSchema);
module.exports = PlaceType;
