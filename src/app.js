const express = require("express");
const path = require("path");
const hbs = require("hbs");

//utils
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();

// Define paths for express
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setıp handelbars engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Static folder
app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Mert Golcu",
    });
});
app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        name: "Mert Golcu",
    });
});
app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        name: "Mert Golcu",
    });
});
app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You mus add address proivde",
        });
    }
    geocode(
        req.query.address,
        (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({
                    error: error,
                });
            }
            forecast(latitude, location, (err, forecastData) => {
                if (error) {
                    return res.send({
                        error: error,
                    });
                }
                res.send({
                    location: location,
                    forecast: forecastData,
                    address:req.query.address
                });
            });
        }
    );
});
app.get("/products", (req, res) => {
    if (!req.query.search) {
        res.send({
            error: "You must provide a search term",
        });
        return;
    }

    res.send({
        products: [],
    });
});
app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Mert Golcu",
        errorMessage: "Help article not found",
    });
});

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "Mert Golcu",
        errorMessage: "Page not found",
    });
});

app.listen("3000", () => {
    console.log("Server is up on port 3000");
});
