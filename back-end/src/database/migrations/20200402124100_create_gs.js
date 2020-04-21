
exports.up = function(knex) {
  return knex.schema.createTable('gsmembros', function(table){
    table.string('id').notNullable();
    table.string('cargo').notNullable();
    table.string('email1').notNullable();
    table.string('email2').notNullable();
    table.string('senha1').notNullable();
    table.string('senha2').notNullable();
    table.boolean('membro_gs').notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('gsmembros');
};
