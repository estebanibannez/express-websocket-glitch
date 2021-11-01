const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const User = new Schema(
	{
		password: { type: String },
		email: String,
		firstName: String,
		provider: String,
		lastName: String,
    	age: String,
		phone: { type: String },
		photo: String,
		role:  { type: String , default: 'ecommerce'}
	},
	{
		timestamps: true,
	},
);

User.methods.encryptPassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

User.methods.matchPassword = async function(password) {
	return await bcrypt.compare(password, this.password);
};

module.exports = model('Usuario', User);
