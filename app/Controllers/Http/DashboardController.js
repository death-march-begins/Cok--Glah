'use strict'

const Class = use('App/Models/Class')
const Booked = use('App/Models/Booking')
const StaticRoomForStatus = use('App/Models/BookingStatus')

class DashboardController {
  
  async getDashboard({ auth, view }) {
    const user = auth.user.toJSON()
    
    let ruangans = await Class.all()
    ruangans = ruangans.toJSON()
    
    let booking = await Booked.all()
    booking = booking.toJSON()
    
    let jurusan = user.jurusan
    let myRoom = await this.getMyRoom({jurusan})
    myRoom = myRoom.toJSON()
    
    let seeClass = new Booked()
    let avClass = await seeClass.getAvailableClass()
    
    return view.render('dashboard/dashboard', {user: user, 
      rooms: ruangans, 
      myrooms: myRoom,
      book: booking,
      av: avClass
    })
  }
  
  async storeClass ({request, response}) {
    const ruangan = await Class.create({
      id_ruangan: request.input('id_ruangan'),
      nama_ruangan: request.input('nama_ruangan'),
      kapasitas: request.input('kapasitas'),
      jurusan: request.input('jurusan')
    })
    const kelasStatis = await StaticRoomForStatus.create({
      id_ruangan: request.input('id_ruangan')
    })
    return response.redirect('/main/dashboard') 
  }
  
  async getMyRoom ({jurusan}){
    const myRoom = await Class
    .query()
    .where('jurusan', jurusan)
    .fetch()
    
    return myRoom
  }
  
}

module.exports = DashboardController
