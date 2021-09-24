const model = require("../../models/message");

module.exports = {
  async find() {
    return new Promise((resolve, reject) =>
      model.find({}, (err, docs) => {
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

  async findByIdAndUpdate(id, { email, message }) {
    const update = { $set: { email, message } };

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
