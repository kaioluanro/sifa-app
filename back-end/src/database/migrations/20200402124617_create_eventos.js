
exports.up = function(knex) {
  return knex.schema.createTable('eventos', function(table){
    table.increments('id');
    table.string('evento_nome').notNullable();
    table.string('data').notNullable();
    table.integer('n_participantes');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('eventos');
};
