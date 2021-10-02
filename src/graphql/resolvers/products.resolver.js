const controller = require('../../controllers/productos.controller');

const getProducts = async function() {
	return await controller.buscar();
};

const getProductsById = async function(parent, args, context, info) {
	return await controller.buscarPorId({ _id: args._id });
};

const deleteProductById = async function(parent, args, context, info) {
	console.log({ _id: args._id })
	return await controller.eliminar( args._id );
};

const updateProduct = async ({id, input}) => {
	console.log({ _id: args._id })
	return await controller.actualizar( id , input);
};

const root = {
	getProducts: getProducts,
	getProductsById: getProductsById,
	deleteProductById: deleteProductById,
	// updateProduct: updateProduct
};

module.exports = {
	Query: root,
};
