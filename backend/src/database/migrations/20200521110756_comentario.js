
exports.up = function(knex) {
  return knex.schema.createTable('comentarios', function(table){
    table.string('id').primary();
    table.string('message').notNullable();
    table.string('audio').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('comentarios');
};
