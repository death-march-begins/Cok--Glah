'use strict'

class DashboardController {
      
    async getDashboard({ auth, view }) {
        const user = auth.user.toJSON()
        return view.render('dashboard/dashboard', {user: user})
      }
    
}

module.exports = DashboardController
