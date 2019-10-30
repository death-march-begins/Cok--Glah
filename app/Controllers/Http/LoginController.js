'use strict'

class LoginController {

    async getLogin({ auth, view }) {
      return view.render('auth/login')
    }
  
    async postLogin({ request, response, auth, session }) {
      const { username, password } = request.all()
      try {
        await auth.attempt(username, password)
      } catch (e) {
        session.flashExcept(['password'])
        session.flash({ error: 'We cannot find any account with these credentials.' })
        return response.redirect('/')
      }
      return response.route('/main/dashboard')
    }
  
    async postLogout({ auth, response }) {
      await auth.logout()
      return response.route('/')
    }

  }
  
  module.exports = LoginController
