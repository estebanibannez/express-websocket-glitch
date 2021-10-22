const model = require("../../models/carrito");

module.exports = {
  async find() {
    return new Promise((resolve, reject) =>
      model.find({}, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }),
    );
  },

  async findById(id) {
    return new Promise((resolve, reject) =>
      model.findOne({ _id: id }, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }),
    );
  },

  async create(data) {
    return new Promise((resolve, reject) =>
      model.create(data, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }),
    );
  },

  async findByIdAndUpdate(id, { email, mensaje }) {
    const update = { $set: { email, mensaje } };

    return new Promise((resolve, reject) =>
      model.updateOne({ _id: id }, update, {}, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }),
    );
  },

  async findByIdAndDelete(id) {
    return new Promise((resolve, reject) =>
      model.remove({ _id: id }, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }),
    );
  },
};
