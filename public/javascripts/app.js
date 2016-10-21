'use strict'

$(document).ready(() => {
  $('select').material_select()
  updateUserListener()
  updatePostListener()
  updatePostListener()
  deletePostListener()
  // getComments()
})

var id = parseInt(window.location.pathname.split('/')[2])

// function getComments(){
//   $.get('/posts/' + id + '/comments')
//   .then(comments => {
//     $('.container-custom').append(comments.body)
//   })
// }

function updateUserListener(){
  $('.btn-edit-user').click(() => {
    $.ajax({
      url: `/posts/${id}/edit`,
      method: 'PUT',
      success: () => {
        console.log('user updated')
      },
    })
  })
}

function deleteUserListener(){
  $('.btn-delete-edit').click(() => {
    $.ajax({
      url: `/posts/${id}/delete`,
      method: 'DELETE',
      success: () => {
        window.location = '/users'
      },
    })
  })
}

function updatePostListener(){
  $('.btn-edit-post').click(() => {
    $.ajax({
      url: `/posts/${id}`,
      method: 'PUT',
      success: () => {
        console.log('post updated')
      },
    })
  })
}

function deletePostListener(){
  $('.btn-delete-post').click(() => {
    $.ajax({
      url: `/posts/${id}`,
      method: 'DELETE',
      success: () => {
        console.log('post deleted')
      },
    })
  })
}
