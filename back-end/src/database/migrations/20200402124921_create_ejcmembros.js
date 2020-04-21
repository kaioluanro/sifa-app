
exports.up = function(knex) {
  return knex.schema.createTable('ejcmembros', function(table){
    table.string('id').notNullable();
    table.string('nome').notNullable();
    table.string('data_niver').notNullable();
    table.string('data_nascimento').notNullable();
    table.string('genero').notNullable();
    table.string('circulo').notNullable();
    table.text('endereço').notNullable();
    table.string('ejc').notNullable();
    table.string('telefone').notNullable();
    table.string('estado').notNullable();
    table.text('cargos_ocupados');
    table.integer('presenca');
    table.text('foto');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('ejcmembros');
};
