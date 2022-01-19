

$(document).ready(function(){
// Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBnDKAin9DW03i1S68HFdcMWZCR6GpS7FY",
    authDomain: "otakucode-f19eb.firebaseapp.com",
    projectId: "otakucode-f19eb",
    storageBucket: "otakucode-f19eb.appspot.com",
    messagingSenderId: "649601604414",
    appId: "1:649601604414:web:9afbb83e0c9c56974eea6f",
    measurementId: "G-DCHRH3GYXM"
  };

  // Initialize Firebase
    const app = firebase.initializeApp(firebaseConfig);
  
    // Inicializar Auth de Firebase
    const auth = firebase.auth();
  
    // Inicializar Auth de Google
    var provider = new firebase.auth.GoogleAuthProvider();
  
    // Inicializar Firestore (Base de datos)
    const db = firebase.firestore();
    
    //A
    $("#butonRegistrate").click(function (e) {
      e.preventDefault();
      // Esto hará que el login desaparezca
      $("#login").hide();
      // Esto hara que el formulario de registro aparezca
      $(".registro-usuario").show();
    })


    // Si se completa el formulario de registro y se envia, registra al nuevo usuario y se guarda la sesion
  $("#butonRegistrar").click(function (e) {
    e.preventDefault();
    // Capturamos los datos enviados por el formulario de registro
    // Campo email
    var email = $("#registroEmail").val();
    //Campo Password
    var password = $("#registroPassword").val();
    // Metodo de firebase que permite registro de usarios con email

    if (password.length<6) {
      alert(" ⚠️ Deben ser 6 carácteres como mínimo")
    };

    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // ocultar formulario de registro
      $(".registro-usuario").hide();
      // $("#contenidoWeb").show();
      // limpiar formulario de registro
      $("#registroUsuario").trigger("reset"); 
    })

    .catch((error) => { // Esto permite capturar el error, se puede trabajar este catch con los codigos de error
      var errorCode = error.code;
      var errorMessage = error.message;
      // Muestro en la consola el codigo de error y el mensaje de error
      if (error.code == 'auth/email-already-in-use') {
        $("#alert-login-registro").removeClass("d-none");
        $("#alert-login-registro").addClass("d-block");
      }
    });
  })
  
  //MODIFICANDO ESTA PARTE
  // Acceso de usuarios
  // Ingresar por email
  $("#butonIngresoCorreo").click(function (e) {
    e.preventDefault();
    // Mostramos formulario de ingreso por email
    $("#input_parameters").show();
    // Ocultamos boton de ingreso por email
    $("#butonIngresoCorreo").hide();
    $("#login").hide();
  })

  // Si ingresamos por correo y password mostramos formulario de ingreso 
  $("#butonIngresarCorreo").click(function (e) {
    e.preventDefault();
    // Capturamos los datos enviados por el formulario de ingreso
    // Campo email
    var email = $("#ingresoCorreo").val();
    // Campo Password
    var password = $("#ingresoContraseña").val();
    // Metodo que permite ingreso de usarios con email
    try {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
          // limpiar formualrio de ingreso
          $("#inicioSesion").trigger("reset");
          // $("#contenedor1").hide;
          // $("#contenedorRegistar").hide;
          // $("#contenidoWeb").show;
          $("#alert-login").hide();
          $("#alert-login-registro").hide();
        })
        .catch((error) => {// Esto permite capturar el error, se puede trabajar este catch con los codigos de error
          var errorCode = error.code;
          var errorMessage = error.message;
          // Muestro en la consola el codigo de error y el mensaje de error
          console.log(errorCode, errorMessage);
        });
    } catch (error) {
      if (error.code == 'auth/argument-error') {
        $("#alert-login").removeClass("d-none");
        $("#alert-login").addClass("d-block");
      }
    }

  })
  
    // Ingresar con google
    $("#butonIngresoGoogle").click(function (e) {
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
  $("#btn-CerrarSesion").click(function (e) {
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
      $("#contenedor1").hide();
      // ocultamos el formulario de registro
      $(".registro-usuario").hide();
      // mostramos el contenido
      $("#contenidoWeb").show();
      // obtienePaises();
    } else {
      // Si usuario esta desconectado
      // Se oculta formulario de registro
      $(".registro-usuario").hide();
      // Se oculta formulario de ingreso
      $("#input_parameters").hide();
      // Se muestra el boton de ingreso por email
      $("#butonIngresoCorreo").show();
      // Se oculta contenido de la página
      $("#contenidoWeb").hide();
      // Se muestra el login
      $("#contenedor1").show()
      // Se muestra el login
      $("#login").show()
    }
  });


    
});