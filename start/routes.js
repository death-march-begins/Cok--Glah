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
Route.get('/','LoginController.getLogin').as('login').middleware(['guest'])
Route.post('/', 'LoginController.postLogin').as('login').middleware(['guest'])
Route.get('register','RegisterController.getRegister').as('register').middleware(['guest'])
Route.post('register','RegisterController.postRegister').as('register').middleware(['guest']).validator('Register')
Route.get('register/confirm/:token', 'RegisterController.confirmEmail')
Route.get('logout', 'LoginController.postLogout').as('logout').middleware(['admin'])

Route.group(() => {
    Route.get('dashboard', 'DashboardController.getDashboard')
    Route.get('booking', 'BookingController.index')
}).prefix('/main').middleware(['admin'])
