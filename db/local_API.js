'use strict'

var knex = require('./knex')

module.exports = {
    getAllUsers() {
        return knex('users')
    },
    getUser(id) {
        return knex('users')
            .where('users.id', id)
            .first()
    },
    createUser(user) {
        return knex('users')
            .insert(user)
    },
    updateUser(id, user) {
        return knex('users')
            .update(user)
            .where('posts.id', id)
    },
    deleteUser(id) {
        return knex('users')
            .del()
            .where('users.id', id)
    },
    findOrCreate(profile, cb2) {
        knex('users')
            .where({
                email: profile.emails[0].value
            })
            .then((user) => {
                if (user.length > 0) {
                    cb2(null, user);
                } else {
                    knex('users')
                        .insert({
                            first_name: profile.name.givenName,
                            last_name: profile.name.familyName,
                            email: profile.emails[0].value,
                            image_url: profile.photos[0].value
                        })
                        .returning(['id', 'first_name', 'last_name', 'email', 'image_url'])
                        .then((user) => {
                            console.log('user after insertion=======', user);
                            cb2(null, user);
                        })
                }
            })
    },
    getAllPosts() {
        return knex('posts')
            .join('users', 'posts.user_id', 'users.id')
            .select('posts.id as postId', 'users.id as userId',
                'users.image_url as userImage', 'users.first_name as firstName',
                'users.last_name as lastName', 'posts.title as title', 'posts.body as postBody')
    },
    getPost(id) {
        return knex('posts')
            .join('users', 'posts.user_id', 'users.id')
            .select('posts.id as postId', 'users.id as userId', 'users.image_url as userImage', 'users.first_name as firstName', 'users.last_name as lastName', 'posts.title as title', 'posts.body as postBody')
            .where('posts.id', id.toString()).first()
    },
    createPost() {
        return knex('posts')
            .insert(post)
    },
    updateOPost(id, newPost) {
        return knex('posts')
            .select()
            .where('id', id)
            .first()
            .then((post) => {
                return knex('posts')
                    .update({
                        title: newPost.title || post.title,
                        body: newPost.body || post.body,
                    })
                    .where('posts.id', id)
            })
    },
    deletePost(id) {
        return knex('posts')
            .del()
            .where('posts.id', id)
    },
    // getAllComments(){
    //   return knex('comments')
    // },
    // getCommentsByPostId(){
    //   return knex('comments')
    //   .join('posts', 'posts.id', 'comments.post_id')
    //   .join('users', 'users.id', 'comments.user_id')
    //   .select('users.first_name as firstName', 'users.last_name as lastName', 'postId as posts.id', 'posts.title as title', 'comments.body as commentBody')
    // }
}
