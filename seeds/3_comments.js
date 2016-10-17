'use strict'

exports.seed = function(knex, Promise) {
    return knex(`comments`).del()
        .then(() => {
            return knex(`comments`).insert([{
                body: `I think the Boat is a great idea. Everyone knows zombies can't swim, especially Craig.
                That may be the only way to be safe from him, to be honest. I've never seen a zombie move that fast.`,
                user_id: 1,
                post_id: 3,
            }])
        })
}
