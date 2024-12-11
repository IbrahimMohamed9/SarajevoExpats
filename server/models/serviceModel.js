const mongoose = require("mongoose");
const serviceSubtype = require("./serviceSubtypeModel");

const serviceSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Please add the name"] },
    content: { type: String, required: [true, "Please add the content"] },
    picture: { type: String, required: [true, "Please add the picture"] },
    pictureDescription: { type: String },
    phone: { type: String },
    email: { type: String },
    serviceSubtype: {
      type: String,
      required: [true, "please add the serviceType"],
      validate: {
        validator: async (value) => {
          const count = await serviceSubtype.countDocuments({ name: value });
          return count > 0;
        },
        message:
          "The specified type does not exist in ServiceSubtypes collection",
      },
    },
  },
  {
    validate: {
      validator: (value) => {
        return this.email || this.phone;
      },
      message: "At least one of phone, email, or url must be provided",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Service = mongoose.model("Services", serviceSchema);

module.exports = Service;
