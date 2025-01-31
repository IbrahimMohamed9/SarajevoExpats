const mongoose = require("mongoose");
const serviceType = require("./serviceTypeModel");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add the name"] },
    content: { type: String, required: [true, "Please add the content"] },
    picture: { type: String, required: [true, "Please add the picture"] },
    pictureDescription: { type: String },
    phone: { type: String },
    email: { type: String },
    serviceType: {
      type: String,
      required: [true, "please add the serviceType"],
      validate: {
        validator: async function (value) {
          const type = await serviceType.findOne({ name: value });
          if (!type) return false;

          this.type = type.name;
          return true;
        },
        message:
          "The specified type does not exist in service types collection",
      },
    },
    priority: { type: Number, default: 0 },
    pinned: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Service = mongoose.model("Services", serviceSchema);

module.exports = Service;
