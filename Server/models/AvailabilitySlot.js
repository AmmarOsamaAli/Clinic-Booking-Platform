const mongoose = require("mongoose");
const Doctor = require("./Doctor");

const availabilitySlotSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
      required: true,
      validate: function (date) {
        if (this.isNew || this.isModified('startTime')) {
          return date > new Date();
        }
        return true
      },
    },
    endTime: {
      type: Date,
      required: true,
      validate: function (time) {
        return time > this.startTime;
      },
    },
    doctor: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
  },{ timestamps: true });

const AvailabilitySlot = mongoose.model("AvailabilitySlot", availabilitySlotSchema,);

module.exports = AvailabilitySlot;
