'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('posts', (table) => {
    table.increments()
    table.string('title').notNullable()
    table.text('body').notNullable()
    table.integer('user_id')
    table.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('posts')
}
