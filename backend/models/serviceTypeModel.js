const mongoose = require("mongoose");

const serviceTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the name"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

serviceTypeSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate().$set;
  const oldData = await ServiceType.findOne(this._conditions);

  if (update.name) {
    const ServiceSubtype = mongoose.model("ServiceSubtypes");
    await ServiceSubtype.updateMany(
      { serviceType: oldData.name },
      { $set: { serviceType: update.name } }
    );
  }
  next();
});

const ServiceType = mongoose.model("ServiceTypes", serviceTypeSchema);

module.exports = ServiceType;
