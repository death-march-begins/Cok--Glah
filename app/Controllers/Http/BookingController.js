'use strict'

class BookingController {
    async index({ request, response, view }) {
        return view.render('booking');
    }
    
}

module.exports = BookingController
