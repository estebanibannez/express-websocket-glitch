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

User.methods.matchPassword = function (password) {
	const result = bcrypt.compareSync(password, this.password);
	return result;
};

module.exports = model('Usuario', User);
