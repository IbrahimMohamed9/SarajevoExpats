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

serviceTypeSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();
  console.log(update);

  if (update.name) {
  }
  next();
});

module.exports = mongoose.model("ServiceType", serviceTypeSchema);
