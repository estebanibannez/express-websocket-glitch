const axios = require("axios");

const URL = "http://localhost:8080";

axios
  .get(URL + "/productos/listar")
  .then((response) => {
    // console.log(response.data);
  })
  .catch(console.log);
