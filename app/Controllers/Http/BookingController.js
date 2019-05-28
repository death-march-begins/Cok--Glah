'use strict'

const Booked = use('App/Models/Booking')

class BookingController {
    async index({ auth, request, response, view }) {
        const user = auth.user.toJSON()
        
        let seeClass = new Booked()
        let avClass = await seeClass.getAvailableClass()
        //console.log(avClass)
        
        return view.render('booking/booking', {user: user, avClass: avClass})
    }

    async storeOrder ({request, response}) {
        const booking = await Booked.create({
          hari: request.input('hari'),
          waktu_mulai: request.input('waktu_mulai'),
          waktu_selesai: request.input('waktu_selesai'),
          tanggal_mulai: request.input('tanggal_mulai'),
          tanggal_selesai: request.input('tanggal_selesai')
        })  
        return response.redirect('/main/booking') 
      }
    
}

module.exports = BookingController
