const { productsCollection } = require('../../data/nedbConection');

module.exports = {
	async find() {
		return new Promise((resolve, reject) =>
			productsCollection.find({}, (err, docs) => {
				if (err) return reject(err);
				return resolve(docs);
			}),
		);
	},

	// async findPage(page, limit) {
	//   return new Promise((resolve, reject) =>
	//     model
	//       .find({})
	//       .skip(page * limit)
	//       .limit(limit)
	//       .exec((err, docs) => {
	//         if (err) return reject(err);
	//         return resolve(docs);
	//       }),
	//   );
	// },

	async findById(id) {
		return new Promise((resolve, reject) =>
			productsCollection.findOne({ _id: id }, (err, docs) => {
				if (err) return reject(err);
				return resolve(docs);
			}),
		);
	},

	async create(data) {
		return new Promise((resolve, reject) =>
			productsCollection.create(data, (err, docs) => {
				if (err) return reject(err);
				return resolve(docs);
			}),
		);
	},

	async findByIdAndUpdate(id, { nombre, precio, descripcion, categoria, stock, thumbnail }) {
		const update = { $set: { nombre, precio, descripcion, categoria, stock, thumbnail } };

		return new Promise((resolve, reject) =>
			productsCollection.updateOne({ _id: id }, update, {}, (err, docs) => {
				if (err) return reject(err);
				return resolve(docs);
			}),
		);
	},

	async findByIdAndDelete(id) {
		return new Promise((resolve, reject) =>
			productsCollection.remove({ _id: id }, (err, docs) => {
				if (err) return reject(err);
				return resolve(docs);
			}),
		);
	},
};
