'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookingSchema extends Schema {
  up () {
    this.create('bookings', (table) => {
      table.increments()
      table.integer('id_admin').unsigned().references('id').inTable('users')
      table.string('id_ruangan', 10).notNullable().references('id_ruangan').inTable('ruangans')
      table.string('hari', 10).notNullable()
      table.time('waktu_mulai', 4).notNullable()
      table.time('waktu_selesai', 4).notNullable()
      table.date('tanggal_mulai').notNullable()
      table.date('tanggal_selesai').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('bookings')
  }
}

module.exports = BookingSchema
