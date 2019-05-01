'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run () {
    const u1 = new User()
    u1.nama = 'Admin'
    u1.username = 'admin'
    u1.email = 'admin@gmail.com'
    u1.password = 'admin'
    await u1.save()
  }
}

module.exports = UserSeeder
