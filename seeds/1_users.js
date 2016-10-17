
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => {
      return Promise.all([
        knex('users').insert({id: 1, first_name: 'Maria', last_name: 'B', image_url: 'https://picturetheday.shootproof.com/gallery/galvanize/photo/383127987/f3daef/share'}),
        knex('users').insert({id: 2, first_name: 'Courtney', last_name: 'C', image_url: 'https://picturetheday.shootproof.com/gallery/galvanize/photo/383128243/ae9ba6/share'}),
        knex('users').insert({id: 3, first_name: 'Leesah', last_name: 'Lemony', image_url: 'https://picturetheday.shootproof.com/gallery/galvanize/photo/383128067/4b8f59/share'}),
      ]);
    });
};
