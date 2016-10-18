'use strict'

var knex = require('.knex')

module.exports = {
  getAllUsers(){
    return knex('users')
  },
  getUser(id){
    return knex('users')
    .where('users.id', id)
    .first()
  },
  createUser(user){
    return knex('users')
    .insert(user)
  },
  updateUser(id, user){
    return knex('users')
    .update(user)
    .where('posts.id', id)
  },
  deleteUser(id){
    return knex('users').del()
    .where('users.id', id)
  },
  getAllPosts(){
    return knex('posts')
    .join('users', 'posts.user_id', 'users_id')
    .select('posts.id as postId'), 'users.id as userId', 'users.image_url as userImage', 'users.first_name as firstName', 'users.last_name as lastName', 'posts.title as title', 'posts.body as postBody')
  },
  getPost(){
    return knex('posts'){
      return knex('posts').insert(post)
    },
  // updatePost
  deletePost(id){
    return knex('posts')
    .del()
    .where('posts.id', id)
  },
  getComments(){
    return knex('comments')
    .join('posts', 'posts.id', 'comments.post_id')
    .join('users', 'users.id', 'comments.user_id')
    .select('users.first_name as firstName', 'users.last_name as lastName', 'posts.title as title', 'comments.body as commentBody')
  }
  }
}
