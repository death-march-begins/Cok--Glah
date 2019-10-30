'use strict'
var moment = require('moment');
const Class = use('App/Models/Class')
const Booked = use('App/Models/Booking')
const StaticRoomForStatus = use('App/Models/BookingStatus')

class DashboardController {
  
  async getDashboard({ auth, view }) {
    
    let seeClass = new Booked()
    let ruangan = new Class()
    
    await ruangan.checkTime()  
    const user = auth.user.toJSON()
    
    let ruangans = await Class.all()
    ruangans = ruangans.toJSON()
    
    let jurusan = user.jurusan
    let myRoom = await ruangan.getAllClass({jurusan})
    let usingDate = await ruangan.getDate({jurusan})
    
    for(var count = 0; count<usingDate.length; count++){
      let tglm = usingDate[count].tanggal_mulai
      let tgls = usingDate[count].tanggal_selesai
      let m = moment(tglm,"YYYYMMDD")
      let s = moment(tgls,"YYYYMMDD")
      tglm = m.format("YYYY-MM-DD")
      tgls = s.format("YYYY-MM-DD")
      usingDate[count].tanggal_mulai=tglm
      usingDate[count].tanggal_selesai=tgls 
    }
    
    let booking = await seeClass.getAll({jurusan})
    let avClass = await seeClass.getEmptyClass({jurusan})
    
    return view.render('dashboard/dashboard', {user: user, 
      rooms: ruangans, 
      myrooms: myRoom,
      book: booking,
      av: avClass,
      usingDate:usingDate
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
  
}

module.exports = DashboardController
