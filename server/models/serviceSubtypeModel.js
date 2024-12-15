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
    versionKey: false,
  }
);

serviceSubtypeSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    const newName = update.name || (update.$set && update.$set.name);

    if (!newName) {
      return next();
    }

    const oldData = await ServiceSubtype.findOne(this._conditions);
    if (!oldData) {
      throw new Error("Service subtype not found");
    }

    if (oldData.name === newName) {
      return next();
    }

    const Service = mongoose.model("Services");

    const result = await Service.updateMany(
      { serviceSubtype: oldData.name },
      { $set: { serviceSubtype: newName } }
    );
    console.log("Services update result:", result);

    next();
  } catch (error) {
    next(error);
  }
});

const ServiceSubtype = mongoose.model("ServiceSubtypes", serviceSubtypeSchema);

module.exports = ServiceSubtype;
