'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

//Route.on('/').render('index')
//Route.get('login', 'AuthController.getLogin').as('login').middleware(['guest'])
Route.get('/','AuthController.getLogin').as('login').middleware(['guest'])
Route.post('/', 'AuthController.postLogin').as('login').middleware(['guest'])
Route.get('logout', 'AuthController.postLogout').as('logout').middleware(['admin'])

Route.get('profile', 'AuthController.getDashboard').as('profile').middleware(['admin'])
Route.get('booking', 'BookingController.index').as('booking').middleware(['admin'])

