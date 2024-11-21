exports.up = function (knex) {
  return knex.schema.createTable("food_items", (table) => {
    table.increments("id").primary();
    table.string("foodName").notNullable();
    table.string("foodDescription");
    table.integer("foodPrice").notNullable();
    table.string("foodStatus").defaultTo("Available"); // Preorder/Order
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("food_items");
};