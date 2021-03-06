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

<<<<<<< HEAD
//Route.on('/').render('index')
//Route.get('login', 'AuthController.getLogin').as('login').middleware(['guest'])
Route.get('/','LoginController.getLogin').as('login').middleware(['guest'])
Route.post('/', 'LoginController.postLogin').as('login').middleware(['guest'])
Route.get('register','RegisterController.getRegister').as('register').middleware(['guest'])
Route.post('register','RegisterController.postRegister').as('register').middleware(['guest']).validator('Register')
Route.get('register/confirm/:token', 'RegisterController.confirmEmail').middleware(['guest'])
Route.get('logout', 'LoginController.postLogout').as('logout').middleware(['admin'])

Route.group(() => {
    Route.get('/index', 'ProfileController.index');
    Route.get('/edit/:id', 'ProfileController.edit')
    Route.post('/update/:id', 'ProfileController.update')
}).prefix('/profile').middleware(['admin'])

Route.group(() => {
    Route.get('dashboard', 'DashboardController.getDashboard')
    Route.post('dashboard/newclass', 'DashboardController.storeClass')
    Route.get('booking', 'BookingController.index')
    Route.post('booking/add', 'BookingController.storeOrder')
    Route.post('booking/send', 'BookingController.sendEmail')
    Route.get('booking/all', 'BookingController.selectAll');
    Route.get('booking/empty', 'BookingController.selectEmpty');
    Route.get('timeline', 'TimelineController.index')
}).prefix('/main').middleware(['admin'])
=======
// Route.on('/').render('welcome')
Route.on('/').render('landing_page')

>>>>>>> master
