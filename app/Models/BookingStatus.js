'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class BookingStatus extends Model {
    static get table () {
        return 'bookings'
    }
}

module.exports = BookingStatus
