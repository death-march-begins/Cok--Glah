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

Route.on('/').render('index')
Route.get('landing_page', 'AuthController.getDashboard').as('landing_page').middleware(['auth'])
Route.get('login', 'AuthController.getLogin').as('login')
Route.post('login', 'AuthController.postLogin').as('login')
Route.get('logout', 'AuthController.postLogout').as('logout').middleware(['auth'])
