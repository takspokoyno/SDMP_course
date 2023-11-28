const mongoose = require("mongoose");

const footballClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  foundationYear: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const FootballClub = mongoose.model("FootballClub", footballClubSchema);

module.exports = FootballClub;
