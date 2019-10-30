'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookingStatusSchema extends Schema {
  up () {
    this.create('booking_statuses', (table) => {
      table.increments()
      table.string('id_ruangan', 10).notNullable().references('id_ruangan').inTable('ruangans')
      table.integer('status', 1)
      table.timestamps()
    })
  }

  down () {
    this.drop('booking_statuses')
  }
}

module.exports = BookingStatusSchema
