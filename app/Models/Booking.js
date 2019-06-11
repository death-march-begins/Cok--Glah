'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */

const Database = use('Database')
const Model = use('Model')

class Booking extends Model {
    static get table () {
        return 'bookings'
    }
    static get primaryKey () {
        return 'id'
    }
    static get hidden () {
        return ['created_at','updated_at']
    }
    async getEmptyClass({jurusan}){
        try{
            let pemesan = await Database.raw('select r.id_ruangan, r.nama_ruangan, r.kapasitas, r.jurusan, b.status from ruangans r, booking_statuses b where r.id_ruangan = b.id_ruangan AND b.status = 0 AND r.jurusan = "'+ jurusan+'" ORDER BY b.updated_at')
            //console.log(pemesan[0].length)
            
            if(pemesan[0].length == 0){
                let pesan = {message : "No class available"}
                //console.log(pesan.message)
                return pesan
            }else{
                return pemesan[0]
            }
        }catch(e){
            console.log(e)
        }
    }
    async getAvailableClass({jurusan}){
        try{
            let pemesan = await Database.raw('select r.id_ruangan, r.nama_ruangan, r.kapasitas, r.jurusan, b.status from ruangans r, booking_statuses b where r.id_ruangan = b.id_ruangan AND b.status in (0,1) AND r.jurusan = "'+ jurusan+'" ORDER BY b.updated_at')
            //console.log(pemesan[0].length)
            
            if(pemesan[0].length == 0){
                let pesan = {message : "No class available"}
                //console.log(pesan.message)
                return pesan
            }else{
                return pemesan[0]
            }
        }catch(e){
            console.log(e)
        }
        
    }
    async getDate({jurusan}){
        let today = await this.getDateTime()
        let detail = await Database.raw('select bookings.id_ruangan, bookings.waktu, DATE_FORMAT(tanggal_mulai, "%Y%m%d") AS tanggal_mulai, DATE_FORMAT(tanggal_selesai, "%Y%m%d") AS tanggal_selesai from bookings,ruangans,booking_statuses where bookings.id_ruangan = booking_statuses.id_ruangan AND booking_statuses.status in (0,1) AND ruangans.jurusan = "'+ jurusan+'" AND tanggal_selesai >= "'+today+'" GROUP BY bookings.updated_at ORDER BY booking_statuses.updated_at')
        //console.log(detail[0])
        return detail[0]

    }

    async getAllAvailableClass(){
        try{
            let pemesan = await Database.raw('select r.id_ruangan, r.nama_ruangan, r.kapasitas, r.jurusan, b.status from ruangans r, booking_statuses b where r.id_ruangan = b.id_ruangan AND b.status in (0,1) ORDER BY b.updated_at')
            //console.log(pemesan[0].length)
            
            if(pemesan[0].length == 0){
                let pesan = {message : "No class available"}
                //console.log(pesan.message)
                return pesan
            }else{
                return pemesan[0]
            }
        }catch(e){
            console.log(e)
        }
        
    }
    async getAllDate(){
        let today = await this.getDateTime()
        let detail = await Database.raw('select bookings.id_ruangan, bookings.waktu, DATE_FORMAT(tanggal_mulai, "%Y%m%d") AS tanggal_mulai, DATE_FORMAT(tanggal_selesai, "%Y%m%d") AS tanggal_selesai from bookings,ruangans,booking_statuses where bookings.id_ruangan = booking_statuses.id_ruangan AND booking_statuses.status in (0,1) AND tanggal_selesai >= "'+today+'" GROUP BY bookings.updated_at ORDER BY booking_statuses.updated_at')
        //console.log(detail[0])
        return detail[0]

    }

    async getEmptyAvailableClass(){
        try{
            let pemesan = await Database.raw('select r.id_ruangan, r.nama_ruangan, r.kapasitas, r.jurusan, b.status from ruangans r, booking_statuses b where r.id_ruangan = b.id_ruangan AND b.status = 0 ORDER BY b.updated_at')
            //console.log(pemesan[0].length)
            
            if(pemesan[0].length == 0){
                let pesan = {message : "No class available"}
                //console.log(pesan.message)
                return pesan
            }else{
                return pemesan[0]
            }
        }catch(e){
            console.log(e)
        }
        
    }
    async getEmptyDate(){
        let today = await this.getDateTime()
        let detail = await Database.raw('select bookings.id_ruangan, bookings.waktu, DATE_FORMAT(tanggal_mulai, "%Y%m%d") AS tanggal_mulai, DATE_FORMAT(tanggal_selesai, "%Y%m%d") AS tanggal_selesai from bookings,ruangans,booking_statuses where bookings.id_ruangan = booking_statuses.id_ruangan AND booking_statuses.status = 0 AND tanggal_selesai >= "'+today+'" GROUP BY bookings.updated_at ORDER BY booking_statuses.updated_at')
        //console.log(detail[0])
        return detail[0]

    }
   
    async getDetail(){
        let today = await this.getDateTime()
        let detail = await Database.raw('select waktu, DATE_FORMAT(tanggal_mulai, "%Y%m%d") AS tanggal_mulai, DATE_FORMAT(tanggal_selesai, "%Y%m%d") AS tanggal_selesai from bookings where tanggal_mulai >= "'+today+'" AND tanggal_selesai >= "'+today+'"')
        //console.log(detail[0].length)
        return detail[0]
    }

    async getDetails(){
        let detail = await Database.raw('select waktu, DATE_FORMAT(tanggal_mulai, "%Y-%m-%d") AS tanggal_mulai, DATE_FORMAT(tanggal_selesai, "%Y-%m-%d") AS tanggal_selesai from bookings')
        //console.log(today)
        return detail[0]
    }

    async getAll({jurusan}){
        let all = await Database.raw('select * from bookings, booking_statuses where bookings.id_ruangan = booking_statuses.id_ruangan AND jurusan = "'+ jurusan+'" AND booking_statuses.status = 1 GROUP BY bookings.id_ruangan')
        console.log(all[0])
        return all[0]
    }

    async getDateTime() {
      
        var date = new Date();
        
        var hour = await date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;
        
        var min  = await date.getMinutes();
        min = (min < 10 ? "0" : "") + min;
        
        var sec  = await date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;
        
        var year = await date.getFullYear();
        
        var month = await date.getMonth() + 1;
        month = (month < 10 ? "0" : "") + month;
        
        var day  = await date.getDate();
        day = (day < 10 ? "0" : "") + day;
        
        return year + month + day;
        
      }
      
    
}

module.exports = Booking
