const socket = io();
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");

socket.on("connect", () => {
  console.log("cliente conectado ");

  lblOnline.style.display = "";
  lblOffline.style.display = "none";
  socket.on("productos", function (productos) {
    //console.log(productos);
    document.getElementById("datos").innerHTML = data2TableJS(productos);
  });
});

//recibo los mensajes del servidor
socket.on("messages", (mensajes) => {
  renderMessages(mensajes);
});

/* obtengo las referencias a los formularios */
const form = document.querySelector("formulario");


function send(e, form) {
  debugger;
  e.preventDefault();
  const data = {
    title: form[0].value,
    price: form[1].value,
    thumbnail: form[2].value,
  };
  // const data = new FormData(document.getElementById("formulario"));

  fetch("/api/productos/guardar", {
    headers: {
      "content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((productos) => {
      console.log("respuesta", productos);
      form.reset();
      socket.emit("update", "ok");
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
}

socket.on("disconnect", () => {
  lblOnline.style.display = "none";
  lblOffline.style.display = "";
  console.log("cliente desconectado");
});

//se pasa por parametro el arreglo de productos que viene del server
function data2TableJS(productos) {
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
              <th>Nombre</th>
              <th>Precio</th>
              <th>Foto</th>
          </tr>
          {{#each productos}}
          <tr>
              <td>{{this.title}}</td>
              <td>$ {{ this.price }}</td>
              <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
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
                  <small style="color:#74BB00"><i>${elem.message}</i></small>
              </div>
              <span style="color:#591D03">${elem.date} </span>
            </li>
            `;
    })
    .join(" ");

  document.querySelector("#messages").innerHTML = html;
}

//listener que envia los mensajes al server

const btnEnviar = document.querySelector("#btnEnviar");
const formMessages = document.querySelector("#formMessages");

formMessages.addEventListener("submit", (e) => {
  debugger;
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const msg = document.querySelector("#message").value;
  let message = {
    email: email,
    message: msg,
    // date: new Date().toLocaleDateString(),
  };
  debugger;
  if (email != "" && msg != "") {
    socket.emit("new-message", message);
    //limpio la caja mensaje luego de enviar por socket
    document.querySelector("#message").value = "";
  }
});

//=============================== MENSAJES ============================//
