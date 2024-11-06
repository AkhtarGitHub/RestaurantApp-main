const { Restaurants, Cuisines } = require('./utils/data');
const express = require("express");
const path = require("path");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("./utils/restaurantUtils");

const app = express();
let restaurantData = {}; // This should be populated soon

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

// Populate restaurantData with generated menus for each restaurant on app startup
Restaurants.forEach((restaurant) => {
  restaurantData[restaurant.id] = generateMenu();
});

/**
 * GET /
 * Renders the homepage that lists cities and restaurant names.
 */
app.get("/", (request, response) => {
  // Select a random restaurant and menu item to display on the homepage
  const randomRestaurantId =
    Restaurants[Math.floor(Math.random() * Restaurants.length)].id;
  const randomMenuItem =
    restaurantData[randomRestaurantId].items[
      Math.floor(
        Math.random() * restaurantData[randomRestaurantId].items.length
      )
    ];

  response.render("index", {
    restaurants: Restaurants,
    randomMenuItem,
    randomRestaurant: randomRestaurantId,
  });
});

/**
 * GET /restaurant
 * Displays a specific restaurant's random menu.
 * The cuisine is randomly selected and a menu is generated based on it.
 */
app.get("/restaurant", (request, response) => {
  const restaurantId = request.query.restaurantId;
  console.log(`restaurantId: ${restaurantId}`);
  const restaurant = Restaurants.find((r) => r.id === restaurantId);
  const menu = restaurantData[restaurantId];

  if (restaurant && menu) {
    response.render("menu", {
      restaurant: restaurant.name,
      menu,
    });
  } else {
    response.status(404).send("Restaurant not found");
  }
});

// Add any other required routes here

/**
 * GET /alerts
 * Displays the menu alerts for each restaurant, showing any special items.
 */
app.get("/alerts", (request, response) => {
  const specials = Restaurants.map((restaurant) => {
    const menu = restaurantData[restaurant.id];
    const specialItem = menu.items.find((item) => item.isSpecial);
    return {
      restaurant: restaurant.name,
      special: specialItem || "No current specials",
    };
  });

  response.render("alerts", { specials });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
