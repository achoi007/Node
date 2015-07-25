var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	username: {
		type: String,
		trim: true
	},
	password: String,
	created: {
		type: Date,
		default: Date.now,	
	},
	url: {
		type: String,
		set: function(url) {
			if (!url) {
				return url;
			} else {
				if (url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0) {
					url = 'http://' + url;
				}
				return url;
			}
		}	
	},
});

UserSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
});

UserSchema.set('toJSON', { getters: true, virtuals: true });

UserSchema.statics.findMales = function(callback) {
	this.find({ firstName: { $ne: 'Lily' } }, callback);	
};

UserSchema.methods.checkPwd = function() {
	return this.password.length > 6;	
};

console.log("Created user schema");
mongoose.model('User', UserSchema);