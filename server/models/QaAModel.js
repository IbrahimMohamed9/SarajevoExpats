const mongoose = require("mongoose");

const QaASchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    priority: { type: Number, default: 0 },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

const QaA = mongoose.model("QaAs", QaASchema);
module.exports = QaA;
