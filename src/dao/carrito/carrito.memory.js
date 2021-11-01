const { cartCollection } = require("../../data/nedbConection");

module.exports = {
  async find() {
    return new Promise((resolve, reject) =>
    cartCollection.find({}, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }),
    );
  },

  async findById(id) {
    return new Promise((resolve, reject) =>
    cartCollection.findOne({ _id: id }, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }),
    );
  },

  async create({ email, mensaje, autor, timestamp }) {
    return new Promise((resolve, reject) =>
    cartCollection.insert(
        { email, mensaje, autor, timestamp: new Date() },
        (err, docs) => {
          if (err) return reject(err);
          return resolve(docs);
        },
      ),
    );
  },

  async findByIdAndUpdate(id, { email, mensaje }) {
    const update = { $set: { email, mensaje, timestamp: new Date() } };

    return new Promise((resolve, reject) =>
    cartCollection.update({ _id: id }, update, {}, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }),
    );
  },

  async findByIdAndDelete(id) {
    return new Promise((resolve, reject) =>
    cartCollection.remove({ _id: id }, (err, docs) => {
        if (err) return reject(err);
        return resolve(docs);
      }),
    );
  },
};