$(document).ready(function () {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    const firebaseConfig = {
      apiKey: "AIzaSyC8U1ZtnE782jl81fFuqhc1MuqAk8nSNq4",
      authDomain: "fir-demo-6cf48.firebaseapp.com",
      projectId: "fir-demo-6cf48",
      storageBucket: "fir-demo-6cf48.appspot.com",
      messagingSenderId: "759816336",
      appId: "1:759816336:web:ed31cf4592bd72e3abf815",
      measurementId: "G-EKPJ2FVDWC"
    };
  
    // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
  
    // Inicializar Auth de Firebase
    const auth = firebase.auth();
  
    // Inicializar Auth de Google
    var provider = new firebase.auth.GoogleAuthProvider();
  
    // Inicializar Firestore (Base de datos)
    const db = firebase.firestore();
  
    // Rergistrar los usuarios
    // Si no esta registrado, debe hacer click en boton registrar
    $("#btnRegistro").click(function (e) {
      e.preventDefault();
      // Esto hará que el login desaparezca
      $("#login").hide();
      // Esto hara que el formulario de registro aparezca
      $(".registro-usuario").show();
    })
    // Si se completa el formulario de registro y se envia, registra al nuevo usuario y se guarda la sesion
    $("#btnRegistrar").click(function (e) {
      e.preventDefault();
      // Capturamos los datos enviados por el formulario de registro
      // Campo email
      var email = $("#registroEmail").val();
      //Campo Password
      var password = $("#registroPassword").val();
  
      // Metodo de firebase que permite registro de usarios con email
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
          // ocultar formulario de registro
          $(".registro-usuario").hide();
          // limpiar formulario de registro
          $("#registroUsuario").trigger("reset");
        })
        .catch((error) => { // Esto permite capturar el error, se puede trabajar este catch con los codigos de error
          var errorCode = error.code;
          var errorMessage = error.message;
          // Muestro en la consola el codigo de error y el mensaje de error
          console.log(errorCode, errorMessage);
        });
    })
  
  
  
    // Acceso de usuarios
    // Ingresar por email
    $("#btnIngresoEmail").click(function (e) {
      e.preventDefault();
      // Mostramos formulario de ingreso por email
      $("#IngresoEmail").show();
      // Ocultamos boton de ingreso por email
      $("#btnIngresoEmail").hide();
    })
  
    // Si ingresamos por correo y password mostramos formulario de ingreso 
    $("#btnIngresoConEmail").click(function (e) {
      e.preventDefault();
      // Capturamos los datos enviados por el formulario de ingreso
      // Campo email
      var email = $("#ingresoEmail").val();
      // Campo Password
      var password = $("#ingresoPassword").val();
  
      // Metodo que permite ingreso de usarios con email
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          // limpiar formualrio de ingreso
          $("#IngresoEmail").trigger("reset");
        })
        .catch((error) => {// Esto permite capturar el error, se puede trabajar este catch con los codigos de error
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    })
  
    // Ingresar con google
    $("#btnIngresoGmail").click(function (e) {
      e.preventDefault();
      auth.signInWithPopup(provider)
        .then(result => {
          console.log("Ingreso con Google");
        })
        .catch(err => {
          console.log(err);
        })
    })
  
    // Desconexion de Usuarios
    // Boton LogOut
    $("#logout").click(function (e) {
      e.preventDefault();
      auth.signOut().then(() => {
        console.log("Log Out");
      })
    })
  
    // Ver si sesion esta activa
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Si usuario esta conectado
        // ocultamos el login
        $("#login").hide();
        // ocultamos el formulario de registro
        $(".registro-usuario").hide();
        // mostramos el contenido
        $("#contenidoWeb").show();
        obtienePaises();
      } else {
        // Si usuario esta desconectado
        // Se oculta formulario de registro
        $(".registro-usuario").hide();
        // Se oculta formulario de ingreso
        $("#IngresoEmail").hide();
        // Se muestra el boton de ingreso por email
        $("#btnIngresoEmail").show();
        // Se oculta contenido de la página
        $("#contenidoWeb").hide();
        // Se muestra el login
        $("#login").show()
      }
    });
  
    // Boton enviar Formulario pais
    $("#btnAddCountry").click(function (e) {
      e.preventDefault();
      // Capturo los datos enviados desde el formulario con id "registroPaises"
      var nombre = $("#nameCountry").val();
      var capital = $("#capitalCountry").val();
      var poblacion = $("#populationCountry").val();
      var idioma = $("#languagueCountry").val();
      if (nombre.length > 0 && capital.length > 0 && poblacion.length > 0 && idioma.length > 0) {
        // Metodo de escritura para añadir elementos a la coleccion "paises", 
        // si la coleccion no existe, la crea implicitamente
        db.collection("paises").add({
          nombre: nombre,
          capital: capital,
          poblacion: poblacion,
          idioma: idioma,
        })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            // Reseteo el formulario de registro de paises
            $("#registroPaises").trigger("reset");
            // Invoco al metodo obtienePaises()
            obtienePaises();
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      } else {
        alert('Favor completar todos los campos');
      }
  
    });
  
    // Boton Actualizar Formulario pais
    $("#btnSaveCountry").click(function (e) {
      e.preventDefault();
      var nombre = $("#nameCountry").val();
      var capital = $("#capitalCountry").val();
      var poblacion = $("#populationCountry").val();
      var idioma = $("#languagueCountry").val();
      var id = $("#idCountry").val();
  
      // Metodo de escritura para actualizar elementos a la coleccion "paises", 
      db.collection("paises").doc(id).update({
        nombre: nombre,
        capital: capital,
        poblacion: poblacion,
        idioma: idioma,
      })
        .then(() => {
          console.log("Document successfully updated!");
          // Reseteo el formulario de registro de paises
          $("#registroPaises").trigger("reset");
          // Invoco al metodo obtienePaises()
          obtienePaises();
          $("#btnAddCountry").removeClass("d-none");
          $("#btnAddCountry").addClass("d-block");
          $("#btnSaveCountry").removeClass("d-block");
          $("#btnSaveCountry").addClass("d-none");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
  
    })
  
    // Metodo que sirve para mostrar los países en la tabla
    function setupPaises(data) {
      $("#dataPaises").empty();
      if (data.length > 0) {
        let html = '';
        data.forEach(doc => {
          // doc.data(), contiene los valores del objeto
          const country = doc.data();
          // consulto y guardo id del objeto
          const tr = `
            <tr>
              <td>${country.nombre}</td>
              <td>${country.capital}</td>
              <td>${country.poblacion}</td>
              <td>${country.idioma}</td>
              <td>
              <button data-id="${doc.id}" class="btn btn-success btn-edit-country">
                Editar
              </button>
              <button data-id="${doc.id}" class="btn btn-danger btn-delete-country">
                Eliminar
              </button>
              </td>
            <tr>
          `;
          html += tr;
        });
        $("#dataPaises").append(html);
        // Agregar escucha a todos los botones delete
        const btnsDelete = document.querySelectorAll(".btn-delete-country");
        btnsDelete.forEach(btn => {
          btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            deleteCountry(id);
          })
        })
        // Agregar escucha a todos los botones edit
        const btnsEdit = document.querySelectorAll(".btn-edit-country");
        btnsEdit.forEach(btn => {
          btn.addEventListener("click", (e) => {
            const id = e.target.dataset.id;
            obtienePais(id);
          })
        })
      } else {
        let html = '';
        let tr = `
          <tr>
            <td class="text-center"colspan="4">No existen datos, favor ingresar datos.</td>
          <tr>
        `;
        html += tr;
        $("#dataPaises").append(html);
      }
    };
  
    // Metodo que permite obtener los datos de la BD
    function obtienePaises() {
      db.collection("paises").get().then((snapshot) => {
        setupPaises(snapshot.docs);
      })
    };
  
    // Metodo que permite obtener un dato especifico de la BD
    function obtienePais(id) {
      db.collection("paises").doc(id).get().then((doc) => {
        // Si existe objeto, paso sus datos al formulario
        var pais = doc.data()
        $("#nameCountry").val(pais.nombre);
        $("#capitalCountry").val(pais.capital);
        $("#populationCountry").val(pais.poblacion);
        $("#languagueCountry").val(pais.idioma);
        $("#idCountry").val(id);
        $("#btnAddCountry").removeClass("d-block");
        $("#btnAddCountry").addClass("d-none");
        $("#btnSaveCountry").removeClass("d-none");
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    };
  
    // Metodo que elimina registros
    function deleteCountry(id) {
      db.collection("paises").doc(id).delete().then(() => {
        // Si elimina Actualiza la tabla
        obtienePaises();
      }).catch((error) => {
        console.error("Error removing document: ", error);
      });
    }
  });