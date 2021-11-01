const socket = io.connect();
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");
//=============================== MENSAJES ============================//
//funcion que renderiza los mensajes
function renderMessages(data) {
	let html = data
		.map((elem) => {
			let color = (elem.tipo =="usuario"? "primary": "warning");
			return `
              <li class='list-group-item list-group-item-${color}'>
                <div>
                    <h6 class="my-0">${elem.email}</h6>
                    <small><i>${elem.mensaje}</i></small>
                </div>
                <span style="color:#591D03">${elem.timestamp} </span>
				<span class="badge badge-${color}">${elem.tipo} </span>
              </li>
              `;
		})
		.join(' ');

	document.querySelector('#messages').innerHTML = html;
}

//listener que envia los mensajes al server

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

socket.on('disconnect', () => {
	lblOnline.style.display = 'none';
	lblOffline.style.display = '';
	// console.log('cliente desconectado');
});

socket.on('connect', () => {
	lblOnline.style.display = '';
	lblOffline.style.display = 'none';
	//recibo los mensajes del servidor
	socket.on('messages', (mensajes) => {
		// console.log(mensajes);
		renderMessages(mensajes);
	});
});


