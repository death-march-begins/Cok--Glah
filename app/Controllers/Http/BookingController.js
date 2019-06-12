'use strict'
var moment = require('moment');
const Booked = use('App/Models/Booking')
const Class = use('App/Models/Class')
const StaticRoomForStatus = use('App/Models/BookingStatus')


class BookingController {
  async index({ auth, request, response, view }) {
    const user = auth.user.toJSON()
    let jurusan = user.jurusan
    
    let seeClass = new Booked()
    let avClass = await seeClass.getAvailableClass({jurusan})
    let usingDate = await seeClass.getDate({jurusan})
    // console.log(avClass)
    
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
    
    return view.render('booking/booking', {user: user, avClass: avClass, usingDate: usingDate})
  }
  
  async storeOrder ({session, auth, request, response}) {
    const user = auth.user.toJSON()
    let namaKelas = request.input('namaruang')
    let idKelas = await Class.query().where('nama_ruangan',namaKelas).select('id_ruangan').fetch()
    idKelas = idKelas.toJSON()
    //console.log(idKelas[0].id_ruangan)
    let id_ruangans = idKelas[0].id_ruangan
    
    let tglm =  request.input('tanggal_selesai')
    let wkt =  request.input('myselectbox')
    
    let bookings = new Booked()
    console.log(tglm)
    let m = moment(tglm,"YYYY-MM-DD")
    tglm = m.format("YYYYMMDD")
    let detail = await bookings.getDetail()
    
    for(var count = 0; count<detail.length; count++){
      if(tglm >= detail[count].tanggal_mulai && tglm <= detail[count].tanggal_selesai){
        if(wkt == detail[count].waktu){
          session.flash({ error: 'kelas untuk tanggal dengan jam tersebut sudah tidak tersedia' })
          return response.redirect('/main/booking')  
        }
      }
      
    }
    
    const booking = await Booked.create({
      id_admin: user.id,
      id_ruangan: idKelas[0].id_ruangan,
      waktu: request.input('myselectbox'),
      tanggal_mulai: request.input('tanggal_mulai'),
      tanggal_selesai: request.input('tanggal_selesai'),
      jurusan: user.jurusan
    }) 
    
    await StaticRoomForStatus.query().where('id_ruangan',id_ruangans).update({
      status: 1
    })
    return response.redirect('/main/booking') 
  }
  
  async sendEmail({session, auth, request, response}){
    // send confirmation email
    let toemail = request.input('toemail') 
    let subjek = "CokGlah - " + request.input('subjek')
    let pesan = request.input('messages')
    let fromemail = request.input('fromemail')
    let password = request.input('password')
    
    const Config = use('Config')
    Config.set('mail.smtp.auth.user',fromemail)
    Config.set('mail.smtp.auth.pass',password)
    const Mail = use('Mail')
    console.log(Mail)
    await Mail.raw(pesan, (message) => {
      message.subject(subjek)      
      message.from(fromemail)
      message.to(toemail)    
    })
    session.flash({ notification: {
      type: 'success',
      message: 'Your message has been sent !'
    } })
    return response.redirect('/main/booking')
  }
  
  async selectAll({auth,view}){
    const user = auth.user.toJSON()
    let seeClass = new Booked()
    let avClass = await seeClass.getAllAvailableClass()
    let usingDate = await seeClass.getAllDate()
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
    console.log("berhasil")
    return view.render('booking/booking', {user: user, avClass: avClass, usingDate: usingDate})
  }
  
  async selectEmpty({auth,view}){
    const user = auth.user.toJSON()
    let seeClass = new Booked()
    let avClass = await seeClass.getEmptyAvailableClass()
    let usingDate = await seeClass.getEmptyDate()
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
    console.log("berhasil")
    return view.render('booking/booking', {user: user, avClass: avClass, usingDate: usingDate})
  }
}

module.exports = BookingController
