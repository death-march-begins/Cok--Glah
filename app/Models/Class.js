'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

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
    static get hidden () {
        return ['created_at','updated_at']
      }
}

module.exports = Class
