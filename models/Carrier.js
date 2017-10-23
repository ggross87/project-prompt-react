var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CarrierSchema = new Schema({
  name: {
    type: String
  },
  date: {
    type: Date
  },
  locations: {
    type: String
  }
});

var Carrier = mongoose.model("Carrier", CarrierSchema);
module.exports = Carrier;
