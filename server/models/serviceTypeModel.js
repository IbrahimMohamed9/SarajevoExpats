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
    const Service = mongoose.model("Services");

    const res = await Service.find({ serviceType: oldData.name });

    res.forEach(async (service) => {
      await Service.findOneAndUpdate(
        { _id: service._id },
        { $set: { serviceType: update.name } }
      );
    });
  }
  next();
});

const ServiceType = mongoose.model("ServiceTypes", serviceTypeSchema);

module.exports = ServiceType;
