const express = require("express");
const knex = require("knex")(require("./knexfile").development);
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", async function (req, res) {
    try {
        const foodItems = await knex("food_items").select("*");
        res.render("home", { data: foodItems });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to fetch food items" });
    }
});

app.post("/add", async (req, res) => {
    try {
        const inserted = await knex("food_items").insert(req.body);
        if (inserted.length === 0) {
            return res.status(404).json({ error: "Failed to create food item" });
        }
        const foodItems = await knex("food_items").select("*");
        res.render("home", { data: foodItems });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Failed to create food item" });
    }
});

app.post("/delete", async (req, res) => {
    var requestedFoodName = req.body.foodName;

    try {
        const updateStatus = await knex("food_items").where("foodName", requestedFoodName).del();
        if (updateStatus === 0) {
            return res.status(404).json({ error: "Food item not found" });
        }
        const foodItems = await knex("food_items").select("*");
        res.render("home", { data: foodItems });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete food item" });
    }
});

app.post("/Order", async (req, res) => {
    var requestedid = req.body.id;
    console.log(req.body.id)

    try {
        const updateStatus = await knex("food_items").where("id", requestedid).update({foodStatus:'Ordered'});
        if (updateStatus === 0) {
            return res.status(404).json({ error: "Food item not found" });
        }
        const foodItems = await knex("food_items").select("*");
        res.render("home", { data: foodItems });
    } catch (error) {
        res.status(500).json({ error: "Failed to order food item" });
    }
});

app.post("/issued", async (req, res) => {
    var requestedid = req.body.id;
    console.log(req.body.id)

    try {
        const updateStatus = await knex("food_items").where("id", requestedid).update({foodStatus:'issued'});
        if (updateStatus === 0) {
            return res.status(404).json({ error: "Food item not found" });
        }
        const foodItems = await knex("food_items").select("*");
        res.render("home", { data: foodItems });
    } catch (error) {
        res.status(500).json({ error: "Failed to issue food item" });
    }
});

app.listen(3000, () => {
    console.log("App is running on port 3000");
});