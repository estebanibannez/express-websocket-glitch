const socket = io.connect();
const lblOnline = document.querySelector("#lblOnline");
const lblOffline = document.querySelector("#lblOffline");

socket.on("connect", () => {
  console.log("cliente conectado ");

  lblOnline.style.display = "";
  lblOffline.style.display = "none";
  socket.on("productos", function (productos) {
    console.log(productos);
    document.getElementById("datos").innerHTML = data2TableJS(productos);
  });

  //recibo los mensajes del servidor
  socket.on("messages", (mensajes) => {
    console.log(mensajes);
    renderMessages(mensajes);
  });
});


function eliminarProducto(data){
  let id = data.value;
  fetch('/productos/borrar/' + id, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "DELETE",
    body: JSON.stringify(data),
  })
    .then((respuesta) => respuesta.json())
    .then((productos) => {
      debugger;
      form.reset();
      socket.emit("update", "ok");
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
}

/* obtengo las referencias a los formularios */
/* obtengo el formulario */
const form = document.querySelector("form");

form.addEventListener("submit", (event) => {
  debugger;
  event.preventDefault();
  const data = {
    nombre: form[0].value,
    precio: form[1].value,
    stock: form[2].value,
    thumbnail: form[3].value,
    descripcion: form[4].value,
  };

  fetch("/productos/guardar", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  })
    .then((respuesta) => respuesta.json())
    .then((productos) => {
      debugger;
      form.reset();
      socket.emit("update", "ok");
    })
    .catch((error) => {
      console.log("ERROR", error);
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
              <th>#</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Foto</th>
          </tr>
          {{#each productos}}
          <tr>
              <td>{{this.id}}</td>
              <td>{{this.nombre}}</td>
              <td>$ {{ this.precio }}</td>
              <td> {{ this.stock }}</td>
              <td><img width="50" src={{this.thumbnail}} alt="not found"></td>
              <td><button onclick="eliminarProducto(this);" id="" value="{{ this._id }}" type="button" class="btn btn-primary btn-sm">Borrar</button></td>
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
  const msg = document.querySelector("#mensaje").value;
  let message = {
    email: email,
    mensaje: msg,
    autor: email,
    // date: new Date().toLocaleDateString(),
  };
  if (email != "" && msg != "") {
    socket.emit("new-message", message);
    //limpio la caja mensaje luego de enviar por socket
    document.querySelector("#mensaje").value = "";
  }
});




//=============================== MENSAJES ============================//
