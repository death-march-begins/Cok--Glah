'use strict'

class AuthController {

    async getLogin({ auth, view }) {
      return view.render('login')
    }
  
    async postLogin({ request, response, auth, session }) {
      const { username, password } = request.all()
      try {
        await auth.attempt(username, password)
      } catch (e) {
        session.flashExcept(['password'])
        session.flash({ error: 'We cannot find any account with these credentials.' })
        return response.redirect('login')
      }
      return response.route('profile')
    }
  
    async postLogout({ auth, response }) {
      await auth.logout()
      return response.route('/')
    }
  
    async getDashboard({ auth, view }) {
      const user = auth.user.toJSON()
      return view.render('landing_page', {user: user})
    }
  
  }
  
  module.exports = AuthController
