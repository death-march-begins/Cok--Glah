'use strict'

const Booked = use('App/Models/Booking')

class TimelineController {
  async index({ auth, request, response, view }) {
    const user = auth.user.toJSON()
    let seeClass = new Booked()
    let timeline = await seeClass.getTimeline()
    
    return view.render('dashboard/timeline', {user: user, tl: timeline})
  }

}

module.exports = TimelineController
