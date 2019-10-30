'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Database = use('Database')
const Model = use('Model')
const StaticRoomForStatus = use('App/Models/BookingStatus')

class Class extends Model {
    static get table () {
        return 'ruangans'
    }
    static get primaryKey () {
        return 'id_ruangan'
    }
    static get incrementing () {
        return false
    }
    
    async getAllClass({jurusan}){
        let kelas = await Database.raw('select a.id_ruangan, a.nama_ruangan, a.kapasitas, a.jurusan, b.status from ruangans a, booking_statuses b where a.id_ruangan = b.id_ruangan AND a.jurusan = "'+ jurusan+'" ORDER BY b.updated_at DESC')
        //console.log(kelas[0])
        return kelas[0]
    }
    
    async getDate({jurusan}){
        let today = await this.getDateTime()
        let detail = await Database.raw('select bookings.id_ruangan, bookings.waktu, DATE_FORMAT(tanggal_mulai, "%Y%m%d") AS tanggal_mulai, DATE_FORMAT(tanggal_selesai, "%Y%m%d") AS tanggal_selesai from bookings,ruangans,booking_statuses where bookings.id_ruangan = booking_statuses.id_ruangan AND ruangans.jurusan = "'+ jurusan+'" AND tanggal_selesai >= "'+today+'" GROUP BY bookings.updated_at ORDER BY booking_statuses.updated_at')
        //console.log(detail[0])
        return detail[0]
    }
    
    async checkTime(){
        let today = await this.getDateTime()
        let id = await Database.raw('select id_ruangan from bookings where DATE_FORMAT(tanggal_selesai, "%Y%m%d") >= "'+ today+'"GROUP BY id_ruangan')
        console.log(id[0].length)
        if(id[0].length == 0){
            await StaticRoomForStatus.query().update({
                status: 0
            })
        }else{
            await StaticRoomForStatus.query().update({
                status: 0
            })
            for(var i = 0; i<id[0].length; i++){
                await StaticRoomForStatus.query().where('id_ruangan',id[0][i].id_ruangan).update({
                    status: 1
                })
            }
        }
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

module.exports = Class
