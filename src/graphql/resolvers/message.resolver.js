const controller = require('../../controllers/mensajes.controller');

const createMessage = async function({ input }) {
	console.log({ input });
	return await controller.create({ input });
};

const getMessages = async function() {
	return await controller.findAll();
};

const getMessagesById = async function(parent, args, context, info) {
	return await controller.findById({ _id: args._id });
};

const deleteMessagesById = async function(parent, args, context, info) {
	console.log({ _id: args._id });
	return await controller.delete(args._id);
};

const root = {
	getMessages: getMessages,
	getMessagesById: getMessagesById,
};

const mutation = {
	deleteMessagesById: deleteMessagesById,
	createMessage: createMessage,
};
module.exports = {
	Query: root,
	Mutation: mutation,
};
