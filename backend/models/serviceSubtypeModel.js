const mongoose = require("mongoose");
const ServiceType = require("./serviceTypeModel");
const serviceSubtypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the name"],
      unique: true,
    },
    serviceType: {
      type: String,
      required: [true, "please add the serviceType"],
      validate: {
        validator: async (value) => {
          const count = await ServiceType.countDocuments({ name: value });
          return count > 0;
        },
        message: "The specified type does not exist in ServiceTypes collection",
      },
    },
  },
  {
    timestamps: true,
  }
);

serviceSubtypeSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate().$set;
  const oldData = await ServiceSubtype.findOne(this._conditions);

  if (!update.name) {
    next();
  }

  const Service = mongoose.model("Services");

  await Service.updateMany(
    { serviceSubtype: oldData.name },
    { $set: { serviceSubtype: update.name } }
  );

  next();
});

const ServiceSubtype = mongoose.model("ServiceSubtypes", serviceSubtypeSchema);

module.exports = ServiceSubtype;
