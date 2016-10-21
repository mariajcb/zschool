exports.seed = function(knex, Promise) {
    return knex('users').del()
        .then(() => {
            return Promise.all([
                knex('users').insert({
                    id: 1,
                    first_name: 'Maria',
                    last_name: 'B',
                    image_url: 'http://placekitten.com/300/400',
                    email: 'mbogomaz@gmail.com'
                }),
                knex('users').insert({
                    id: 2,
                    first_name: 'Courtney',
                    last_name: 'C',
                    image_url: 'http://placekitten.com/300/401',
                    email: 'csanders@gmail.com'
                }),
                knex('users').insert({
                    id: 3,
                    first_name: 'Leesah',
                    last_name: 'Lemony',
                    image_url: 'http://placekitten.com/301/401',
                    email: 'llemony@gmail.com'
                }),
            ])
        })
    .then(() => {
        return knex.raw(
            "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
        )
    })
}
