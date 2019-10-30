'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RuanganSchema extends Schema {
  up () {
    this.create('ruangans', (table) => {
      table.string('id_ruangan', 10).notNullable().primary()
      table.string('nama_ruangan',50).notNullable().unique()
      table.integer('kapasitas', 2).notNullable()
      table.string('jurusan', 10).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('ruangans')
  }
}

module.exports = RuanganSchema
