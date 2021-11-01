const socket = io.connect();
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');

socket.on('connect', () => {
	console.log('cliente conectado ');

	lblOnline.style.display = '';
	lblOffline.style.display = 'none';
	socket.on('productos', function(productos) {
		console.log(productos);
		document.getElementById('datos').innerHTML = data2TableJS(productos);
	});

	//recibo los mensajes del servidor
	socket.on('messages', (mensajes) => {
		console.log(mensajes);
		renderMessages(mensajes);
	});
});

function editarProducto(data) {
	let id = data.value;
	fetch('/productos/actualizar/' + id, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'PUT',
		body: JSON.stringify(data),
	})
		.then((respuesta) => respuesta.json())
		.then((productos) => {
			form.reset();
			socket.emit('update', 'ok');
		})
		.catch((error) => {
			console.log('ERROR', error);
		});
}

function eliminarProducto(data) {
	let id = data.value;
	fetch('/productos/borrar/' + id, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'DELETE',
		body: JSON.stringify(data),
	})
		.then((respuesta) => respuesta.json())
		.then((productos) => {
			debugger;
			form.reset();
			socket.emit('update', 'ok');
		})
		.catch((error) => {
			console.log('ERROR', error);
		});
}

/* obtengo las referencias a los formularios */
/* obtengo el formulario */
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
	event.preventDefault();
	const data = {
		nombre: form[0].value,
		precio: form[1].value,
		categoria: $('#categoria').val(),
		stock: form[3].value,
		thumbnail: form[4].value,
		descripcion: form[5].value,
	};

	fetch('/productos/guardar', {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'POST',
		body: JSON.stringify(data),
	})
		.then((respuesta) => respuesta.json())
		.then((productos) => {
			form.reset();
			socket.emit('update', 'ok');
		})
		.catch((error) => {
			console.log('ERROR', error);
		});
});


// const btnCerrarSesion = document.querySelector("#btnCerrarSesion");

// btnCerrarSesion.addEventListener("click", () => {
//   console.log("click");
//   fetch("/api/logout", {
//     headers: {
//       "content-type": "application/json",
//     },
//     method: "GET",
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       debugger;
//       console.log("respuesta", data);
//     })
//     .catch((error) => {
//       console.log("ERROR", error);
//     });
// });

socket.on('disconnect', () => {
	lblOnline.style.display = 'none';
	lblOffline.style.display = '';
	console.log('cliente desconectado');
});

//se pasa por parametro el arreglo de productos que viene del server
function data2TableJS(productos) {
	debugger
	const plantilla = `
  <style>
      .table td,
      .table th {
          vertical-align: middle;
      }
  </style>

  {{#if productos.length}}
  <div class="table-responsive">
      <table class="table table-dark">
          <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Categoria</th>
              <th>Stock</th>
              <th>Foto</th>
              <th>Acción</th>
          </tr>
          {{#each productos}}
          <tr>
              <td>{{this._id}}</td>
              <td>{{this.nombre}}</td>
              <td>$ {{ this.precio }}</td>
              <td> {{ this.categoria }}</td>
              <td> {{ this.stock }}</td>
              <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
              <td>
              <button type="button" class="btn btn-primary btn-sm" data-bs-toggle="modal" id="editar" data-id="{{ this._id }}" value="{{ this._id }}" data-bs-target="#modal">Editar</button>
              <button onclick="eliminarProducto(this);" id="" value="{{ this._id }}" type="button" class="btn btn-danger btn-sm">Borrar</button>
              </td>
          </div>
          </tr>
          {{/each}}
      </table>
  </div>
  {{/if}}
`;
	var template = Handlebars.compile(plantilla);
	let html = template({ productos: productos, hayProductos: productos.length });
	return html;
}

//=============================== MENSAJES ============================//
//funcion que renderiza los mensajes
function renderMessages(data) {
	let html = data
		.map((elem) => {
			return `
            <li class="list-group-item d-flex justify-content-between lh-sm">
              <div>
                  <h6 class="my-0" style="color:#148DFF">${elem.email}</h6>
                  <small style="color:#74BB00"><i>${elem.mensaje}</i></small>
              </div>
              <span style="color:#591D03">${elem.timestamp} </span>
            </li>
            `;
		})
		.join(' ');

	document.querySelector('#messages').innerHTML = html;
}

const btnEnviar = document.querySelector('#btnEnviar');
const formMessages = document.querySelector('#formMessages');

formMessages.addEventListener('submit', (e) => {
	e.preventDefault();

	const email = document.querySelector('#email').value;
	const msg = document.querySelector('#mensaje').value;
	let message = {
		email: email,
		mensaje: msg,
		autor: email,
		// date: new Date().toLocaleDateString(),
	};
	if (email != '' && msg != '') {
		socket.emit('new-message', message);
		//limpio la caja mensaje luego de enviar por socket
		document.querySelector('#mensaje').value = '';
	}
});

$('#modal').on('shown.bs.modal', function(e) {
	debugger;
	var id = $(e.relatedTarget).data('id');
	// let id = $('#editar').val();
	buscarProductoPorId(id);
});

function buscarProductoPorId(id) {
	debugger;
	fetch('/productos/listar/' + id, {
		headers: {
			'Content-Type': 'application/json',
		},
		method: 'GET',
		// body: JSON.stringify(data),
	})
		.then((respuesta) => respuesta.json())
		.then((productos) => {
			debugger;
      document.getElementById('id').value = productos.data._id;
			document.getElementById('nombretxt').value = productos.data.nombre;
			document.getElementById('preciotxt').value = productos.data.precio;
			document.getElementById('categoriatxt').value = productos.data.categoria;
			document.getElementById('stocktxt').value = productos.data.stock;
			document.getElementById('thumbnailtxt').value = productos.data.thumbnail;
			document.getElementById('descripciontxt').value = productos.data.descripcion;
		})
		.catch((error) => {
			console.log('ERROR', error);
		});
}

/* obtengo el formulario editar */
const formularioEditar = document.getElementById('modalEditar');
formularioEditar.addEventListener('submit', (e) => {
	debugger;
	e.preventDefault();
  let id = $('#id').val();
  var formData = {
    nombre: $("#nombretxt").val(),
    precio: $("#preciotxt").val(),
    categoria: $("#categoriatxt").val(),
    stock: $("#stocktxt").val(),
    thumbnail: $("#thumbnailtxt").val(),
    descripcion: $("#descripciontxt").val(),
  };
	$.ajax({
		url: '/productos/actualizar/' + id,
    type: "PUT",
    data: formData,
    dataType: "json",
    encode: true,
		success: function(dataofconfirm) {
			// do something with the result
      socket.emit('update', 'ok');
      $('#modal').modal('toggle');

		},
	});
});

