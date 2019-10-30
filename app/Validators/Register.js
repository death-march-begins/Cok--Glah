'use strict'

class Register {
  get rules () {
    return {
      nama_depan: 'required|min:2|max:50',
      nama_belakang: 'required|min:2|max:50',
      nip: 'required|min:10',
      username: 'required|unique:users',
      email: 'required|email|unique:users',
      jurusan: 'required',
			password: 'required|min:5'
    }
  }

  get messages() {
		return {
			'email.required': 'The email field is required',
			'email.email': 'Enter a valid email address',
			'email.unique': 'Email already exists',
			'username.required': 'The username field is required',
			'username.unique': 'Username already exists',
			'nama_depan.required': 'The name field is required',
			'nama_depan.min': 'name must be > 2 character',
      'name_depan.max': 'name must be < 30 character',
      'nama_belakang.required': 'The name field is required',
			'nama_belakang.min': 'name must be > 2 character',
      'name_belakang.max': 'name must be < 30 character',
      'jurusan.required': 'The section field is required',
      'nip.required': 'The nip field is required',
      'nip.min': 'nip must be > 10 character',
			'password.required': 'The password field is required',
			'password.min': 'The password field must be at least 5 characters',
			'password.confirmed': 'The password fields do not match',
		}
  }
   
  async fails(messages) {
    //return this.ctx.response.send(errorMessages)
    var pesan = JSON.stringify(messages)
    pesan = pesan.replace('[','')
    pesan = pesan.replace(']','')
    var msg = JSON.parse(pesan)
    console.log(msg.message)
    this.ctx.session.flash({ error: msg.message })
    return this.ctx.response.redirect('/register')
	}
}

module.exports = Register
