'use strict'

class AuthController {

    async getLogin({ view }) {
      return view.render('login')
    }
  
    async postLogin({ request, response, auth }) {
      const { username, password } = request.all()
      await auth.attempt(username, password)
      return response.route('profile')
    }
  
    async postLogout({ auth, response }) {
      await auth.logout()
      return response.route('/')
    }
  
    async getProfile({ auth, view }) {
      const user = auth.user.toJSON()
      return view.render('profile', {user: user})
    }
  
  }
  
  module.exports = AuthController
