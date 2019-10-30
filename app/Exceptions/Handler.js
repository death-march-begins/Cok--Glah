'use strict'

const BaseExceptionHandler = use('BaseExceptionHandler')

/**
 * This class handles all exceptions thrown during
 * the HTTP request lifecycle.
 *
 * @class ExceptionHandler
 */
class ExceptionHandler extends BaseExceptionHandler {
  /**
   * Handle exception thrown during the HTTP lifecycle
   *
   * @method handle
   *
   * @param  {Object} error
   * @param  {Object} options.request
   * @param  {Object} options.response
   *
   * @return {void}
   */
  async handle (error, { request, response, session, view }) {
      console.log(error.message);
  }

  /**
   * Report exception for logging or debugging.
   *
   * @method report
   *
   * @param  {Object} error
   * @param  {Object} options.request
   *
   * @return {void}
   */
  async report (error, { request }) {
  }
}

module.exports = ExceptionHandler

// async handle (error, { response, session }) {
  //   if (error.name === 'ValidationException') {
  //     // session.withErrors(error.messages).flashAll()
  //     session.flash({ error: 'We cannot find any account with these credentials.' })
  //     await session.commit()     
  //   }
  //     response.status(error.status)
  //     .send(error.message)
  //     console.log(error.message);
  //     response.redirect('back',true)
  //     return

  // if (error.code === 'E_INVALID_SESSION') {
  //   session.flash({ error: 'You must be authenticated to access this page!' })

  //   return response.redirect('/')
  // }

  // return super.handle(...arguments)
  // } 
