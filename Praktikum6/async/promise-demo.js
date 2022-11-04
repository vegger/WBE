//
//  One promise with multiple consumers
//
//  The getProfile method creates a promise that is resolved with 
//  a mock profile. The user is then passed to navbar.showUsername() 
//  and account.showProfile().
//
//  Remember that a promise serves as a placeholder for the result 
//  of an operation. Here, the user.profilePromise is a placeholder 
//  used by the showUsername and show Profile functions. 
//  These functions can be safely called at anytime before or after 
//  the profile data is available. The callbacks they use to print 
//  the data to the console will only be invoked once the profile 
//  is loaded.
//

var user = { 
	profilePromise: null,

	getProfile: function () {
		if (!this.profilePromise) {
			
			// This code would request the profile from the server
			var mockProfile = {
				name: 'Samantha', 
				subscribedToSpam: false
			}

			this.profilePromise = new Promise(function (resolve, reject) {
				setTimeout(()=>resolve(mockProfile), 1000)
			})
		}
		return this.profilePromise
	}
}

var navbar = {
	showUsername: function (user) {
		user.getProfile().then(function (profile) { 
			console.log('*** Navbar ***')
			console.log('Name: ' + profile.name)
		})
	}
}

var account = {
	showProfile: function (user) {
		user.getProfile().then(function (profile) { 
			console.log('*** User Profile ***')
			console.log('Name: ' + profile.name)
			console.log('Send lots of email? ' + profile.subscribedToSpam)
		})
	} 
}

navbar.showUsername(user)
account.showProfile(user)



