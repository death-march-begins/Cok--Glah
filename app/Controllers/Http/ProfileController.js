'use strict'
const User = use('App/Models/User')
const Helpers = use('Helpers')

class ProfileController {
    async index({request, response, view, auth}){
        const user = auth.user.toJSON()
        return view.render('profile/profile', { user: user })
    }
    
    async edit({request, response, view, params}){
        const id = params.id;
        const profile = await User.find(id);
        //console.log('berhasil')
        return view.render('profile/profileEdit', { user : profile})
    }
    
    async update({request, response, view, params, session}){
        const id = params.id;
        const profile = await User.find(id);
        profile.nama_depan = request.input('nama_depan');
        profile.nama_belakang = request.input('nama_belakang');
        profile.username = request.input('username');
        
        const randomNumber = new Date().getTime()+Math.floor(Math.random() * 1000)
        const profilePic = request.file('images', {
            types: 'image',
            size: '2mb',
            allowedExtensions: ['jpg', 'png', 'jpeg']
        })
        
        await profilePic.move(Helpers.publicPath('uploads'), {
            name: (randomNumber)+'cokglah.jpg',
            overwrite: true
        })
        profile.image = (randomNumber)+'cokglah.jpg'

        if (!profilePic.moved()) {
            return profilePic.error()
        }
        
        await profile.save();
        session.flash({ notification: {
            type: 'success',
            message: 'Your profile has been changed !'
        } })
        return response.redirect('/profile/index') 
    }
}

module.exports = ProfileController
