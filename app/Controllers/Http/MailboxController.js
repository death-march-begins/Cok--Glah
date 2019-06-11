'use strict'

class MailboxController {
    async index({ auth, request, response, view }) {
        const user = auth.user.toJSON()
        
        return view.render('email/mailbox', {user: user})
      }
}

module.exports = MailboxController
