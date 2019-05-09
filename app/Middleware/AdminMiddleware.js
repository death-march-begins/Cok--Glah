'use strict'

class AdminMiddleware {

  async handle({ session, request, response, auth }, next) {
    // call next to advance the request
    // add headers to response

    // response.header('Cache-Control', 'nocache, no-store, max-age=0, must-revalidate')
    // response.header('Pragma', 'no-cache')
    // response.header('Expires', 'Fri, 01 Jan 1990 00:00:00 GMT')
    
    if(!auth.user){
      session.flash({ error: 'Please login to continue !' })
      return response.redirect('/')
    }
        
    await next()
  }
}

module.exports = AdminMiddleware