'use strict'

const User = use('App/Models/User')
const randomString = require('random-string')
const Mail = use('Mail')

class RegisterController {
    async getRegister({ auth, view }) {
        return view.render('auth/register')
    }

    async postRegister({ request, session, response, view }) {        
            
        const user = await User.create({
                nama_depan: request.input('nama_depan'),
                nama_belakang: request.input('nama_belakang'),
                username: request.input('username'),
                nip: request.input('nip'),
                email: request.input('email'),
                jurusan: request.input('jurusan'),
                password: request.input('password'),
                confirmation_token: randomString({ length: 40 })
            })   

        // send confirmation email
        await Mail.send('email.confirm_email', user.toJSON(), message => {
            message
            .to(user.email)
            .subject('Please confirm your email address')
        })
        session.flash({ notification: {
            type: 'success',
            message: 'Please confirm your email adress to continue !'
            } })
        return response.redirect('/')
    }

    async confirmEmail ({ params, session, response }) {
        // get user with the cinfirmation token
        const user = await User.findBy('confirmation_token', params.token)
    
        // set confirmation to null and is_active to true
        user.confirmation_token = null
        user.is_active = true
    
        // persist user to database
        await user.save()
    
        // display success message
        session.flash({
          notification: {
            type: 'success',
            message: 'Your email address has been confirmed.'
          }
        })
    
        return response.redirect('/')
      }
    
}


module.exports = RegisterController
