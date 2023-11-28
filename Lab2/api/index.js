const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const FootballClub = require("./models/team"); 

const app = express();
const port = 3000;
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb+srv", {
  })
  .then(() => {
    console.log("Connected");
  })
  .catch((err) => {
    console.log("Error Connecting");
  });
app.listen(port, () => {
  console.log("Server is running on port 3000");
});

app.post("/addClub", (req, res) => {
  const { name, city, foundationYear, rating } = req.body;
  const newFootballClubEntry = new FootballClub({
    name,
    city,
    foundationYear,
    rating,
  });

  newFootballClubEntry
    .save()
    .then(() => {
      res.status(201).json({ message: "Football club entry added successfully" });
    })
    .catch((error) => {
      res.status(500).json({ error: "Error adding football club" });
    });
});

  app.get("/getAllClubs", async (req, res) => {
    try {
      const allFootballClubs = await FootballClub.find();
      res.status(200).json(allFootballClubs);
    } catch (error) {
      console.error("Error retrieving football clubs:", error);
      res.status(500).json({ error: "Error retrieving football clubs" });
    }
  });

  app.delete("/deleteClub/:id", async (req, res) => {
    const footballClubId = req.params.id;
  
    try {
      await FootballClub.findByIdAndDelete(footballClubId);
      res.status(200).json({ message: "Football club entry deleted successfully" });
    } catch (error) {
      console.error("Error deleting football club entry:", error);
      res.status(500).json({ error: "Error deleting football club entry" });
    }
  });

