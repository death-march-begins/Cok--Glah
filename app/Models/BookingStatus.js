'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Database = use('Database')
const Model = use('Model')

class BookingStatus extends Model {
    static get table () {
        return 'booking_statuses'
    }
}

module.exports = BookingStatus
