'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments()
    table.string('first_name').notNullable().defaultTo('')
    table.string('last_name')
    table.string('image_url')
    table.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('users')
}
