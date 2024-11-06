const { Cuisines } = require("../../utils/data");
const {
  generateRandomMenuItem,
  generateMenu,
  selectRandomCuisine,
} = require("../../utils/restaurantUtils");

describe("Restaurant Utility Functions", () => {
  // Test 1: A random menu item can be generated with proper properties
  test("generateRandomMenuItem should create a valid menu item with name, price, description, and special flag", () => {
    const cuisine = "italian"; // Test with a known cuisine type
    const item = generateRandomMenuItem(cuisine);

    expect(item).toHaveProperty("name");
    expect(typeof item.name).toBe("string");

    expect(item).toHaveProperty("description");
    expect(typeof item.description).toBe("string");

    expect(item).toHaveProperty("price");
    expect(typeof item.price).toBe("string"); // Assuming price is stored as a formatted string

    expect(item).toHaveProperty("isSpecial");
    expect(typeof item.isSpecial).toBe("boolean");
  });

  // Test 2: A random cuisine type can be generated
  test("selectRandomCuisine should return a valid cuisine type", () => {
    const cuisine = selectRandomCuisine();

    // Check that the generated cuisine is one of the defined types
    expect(Cuisines).toContain(cuisine);
  });

  // Test 3: A full menu for a restaurant can be generated
  test("generateMenu should create a menu with 5-10 items, all from the same cuisine", () => {
    const menu = generateMenu();

    expect(menu).toHaveProperty("cuisine");
    expect(Cuisines).toContain(menu.cuisine); // Validate cuisine type

    expect(menu.items).toBeInstanceOf(Array);
    expect(menu.items.length).toBeGreaterThanOrEqual(5);
    expect(menu.items.length).toBeLessThanOrEqual(10);

    // Verify each item has the necessary properties
    menu.items.forEach((item) => {
      expect(item).toHaveProperty("name");
      expect(typeof item.name).toBe("string");

      expect(item).toHaveProperty("description");
      expect(typeof item.description).toBe("string");

      expect(item).toHaveProperty("price");
      expect(typeof item.price).toBe("string");

      expect(item).toHaveProperty("isSpecial");
      expect(typeof item.isSpecial).toBe("boolean");
    });
  });
});
