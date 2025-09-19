const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const FoodModel = require('./models/Food');

const app = express();
const allowOrigins = ["http://localhost:3000", "https://Mervin3012.github.io"];

app.use(cors({
  origin: allowOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

mongoose.connect("mongodb+srv://admin:admin@cluster0.nzsr7.mongodb.net/food")
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

// Insert a new food item
app.post("/insert", async (req, res) => {
  const { foodName, description } = req.body;
  const food = new FoodModel({ foodName, description });

  try {
    await food.save();
    res.send("Data Inserted..");
  } catch (err) {
    res.status(500).send("Error Occurred");
  }
});

// Read all food items
app.get("/read", async (req, res) => {
  try {
    const foods = await FoodModel.find();
    res.send(foods);
  } catch (err) {
    res.status(500).send("Error Occurred");
  }
});

// Update a food item by ID
app.put("/update", async (req, res) => {
  const { newFoodName, id } = req.body;

  try {
    const updateFood = await FoodModel.findById(id);
    if (!updateFood) {
      return res.status(404).send("Data not updated");
    }
    updateFood.foodName = newFoodName;
    await updateFood.save();
    res.send("Data Updated Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error Occurred");
  }
});

// Delete a food item by ID
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await FoodModel.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Food item not found" });
    }
    res.status(200).json({ message: "Food item deleted successfully" });
  } catch (err) {
    console.error("Error during deletion:", err);
    res.status(500).json({ message: "Error deleting food item" });
  }
});

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use dynamic port for deployment compatibility
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
