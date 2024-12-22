const mongoose = require("mongoose");

const QaASchema = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const QaA = mongoose.model("QaAs", QaASchema);
module.exports = QaA;
