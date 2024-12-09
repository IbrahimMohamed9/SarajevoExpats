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
          const count = await ServiceType.countDocuments({ trimName: value });
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
  const update = this.getUpdate();
  console.log(update);
  if (update.name) {
  }
  next();
});

module.exports = mongoose.model("ServiceSubtype", serviceSubtypeSchema);
