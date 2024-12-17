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
        validator: async function (value) {
          const type = await ServiceType.findOne({ name: value });
          if (!type) return false;

          this.serviceType = type.name;
          return true;
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
    const newData = update.$set || {};

    if (!newData.name && !newData.serviceType) {
      return next();
    }

    const oldData = await ServiceSubtype.findOne(this._conditions);
    if (!oldData) {
      throw new Error("Service subtype not found");
    }

    if (
      oldData.name === newData.name &&
      oldData.serviceType === newData.serviceType
    ) {
      return next();
    }

    const Service = mongoose.model("Services");

    const result = await Service.updateMany(
      { serviceSubtype: oldData.name },
      {
        $set: {
          serviceSubtype: newData.name,
          serviceType: newData.serviceType,
        },
      }
    );

    next();
  } catch (error) {
    next(error);
  }
});

const ServiceSubtype = mongoose.model("ServiceSubtypes", serviceSubtypeSchema);

module.exports = ServiceSubtype;
