/* eslint-disable no-underscore-dangle */
// eslint-disable-next-line
const single = (resource, authUser) => ({
  id: resource._id,
  autor: resource.autor,
  email: resource.email,
  mensaje: resource.mensaje,
  usuario: 'test'
});

module.exports = {
  single,
};
