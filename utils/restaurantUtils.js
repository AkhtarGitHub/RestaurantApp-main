const { Restaurants, Cuisines, Dishes } = require("./data");

/**
 * Generates a random menu item based on a given cuisine.
 * @param {string} cuisine - The desired cuisine for the menu item.
 * @returns {*} A random menu item with a name, description, price, and special status.
 */
function generateRandomMenuItem(cuisine) {
  const dishes = Dishes[cuisine];
  const dish = dishes[Math.floor(Math.random() * dishes.length)];
  return {
    name: dish.name,
    description: dish.description,
    price: (Math.random() * 20 + 5).toFixed(2), // Random price between $5 and $25
    isSpecial: Math.random() < 0.3, // 30% chance to be a special item
  };
}

/**
 * Selects a random cuisine type for a restaurant.
 * @returns {*} A random cuisine type.
 */
function selectRandomCuisine() {
  return Cuisines[Math.floor(Math.random() * Cuisines.length)];
}

/**
 * Generates a menu for a restaurant, including a random cuisine type and a list of menu items.
 * @returns {*} An object representing the restaurant's menu, including the cuisine type and items.
 */
function generateMenu() {
  const cuisine = selectRandomCuisine();
  const items = Array.from({ length: Math.floor(Math.random() * 6) + 5 }, () =>
    generateRandomMenuItem(cuisine)
  );
  return { cuisine, items };
}

module.exports = { generateRandomMenuItem, selectRandomCuisine, generateMenu };
