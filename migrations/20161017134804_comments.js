'use strict'

exports.up = function(knex) {
  return knex.schema.createTable('comments', (table) => {
    table.increments()
    table.string('body')
    table.integer('user_id')
    table.integer('post_id')
    table.timestamps()
  })
}

exports.down = function(knex) {
  return knex.schema.dropTable('comments')
}
