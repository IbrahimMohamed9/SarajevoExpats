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
    versionKey: false,
  }
);

serviceTypeSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate().$set;
  const oldData = await ServiceType.findOne(this._conditions);

  if (update.name) {
    const ServiceSubtype = mongoose.model("ServiceSubtypes");

    const res = await ServiceSubtype.find({ serviceType: oldData.name });

    res.forEach(async (subtype) => {
      await ServiceSubtype.findOneAndUpdate(
        { _id: subtype._id },
        { $set: { serviceType: update.name } }
      );
    });
  }
  next();
});

const ServiceType = mongoose.model("ServiceTypes", serviceTypeSchema);

module.exports = ServiceType;
