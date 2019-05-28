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
    async getAvailableClass(){
        
        try{
            let pemesan = await Database.raw('select r.id_ruangan, r.nama_ruangan, r.kapasitas, r.jurusan, b.status from ruangans r, booking_status b where r.id_ruangan = b.id_ruangan AND b.status = 1')
            console.log(pemesan[0].length)
            
            if(pemesan[0].length == 0){
                let pesan = {message : "No class available"}
                console.log(pesan.message)
                return pesan
            }else{
                return pemesan[0]
            }
        }catch(e){
            console.log(e)
        }
        
    }

}

module.exports = Booking
