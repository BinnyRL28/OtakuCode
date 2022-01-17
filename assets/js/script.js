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
      $("#contenedorLogin").hide();
      $("#contenidoWeb").hide();
      // Esto hara que el formulario de registro aparezca
      $("#contenedorRegistar").show();
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
      alert("Deben ser 6 carácteres como mínimo")
    };

    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      // ocultar formulario de registro
      $("#contenedorRegistar").hide();
      $("#contenidoWeb").show();
      // limpiar formulario de registro
      $("#registroUsuario").trigger("reset"); 
    })

    .catch((error) => { // Esto permite capturar el error, se puede trabajar este catch con los codigos de error
      var errorCode = error.code;
      var errorMessage = error.message;
      // Muestro en la consola el codigo de error y el mensaje de error
      console.log(errorCode, errorMessage);
    });

  //   // Si se completa el formulario de registro y se envia, registra al nuevo usuario y se guarda la sesion
  // $("#butonRegistrar").click(function (e) {
  //   e.preventDefault();
  //   // Capturamos los datos enviados por el formulario de registro
  //   // Campo email
  //   var email = $("#IngresoEmail").val();
  //   //Campo Password
  //   var password = $("#ingresoPassword").val();
  //   // Metodo de firebase que permite registro de usarios con email
  //   auth
  //     .createUserWithEmailAndPassword(email, password)
  //     .then(userCredential => {
  //       // limpiar formulario de registro
  //       $("#IngresoEmailForm").trigger("reset");
  //     })
  //     .catch((error) => { // Esto permite capturar el error, se puede trabajar este catch con los codigos de error
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       // Muestro en la consola el codigo de error y el mensaje de error
  //       if (error.code == 'auth/email-already-in-use') {
  //         $("#alert-login-registro").removeClass("d-none");
  //         $("#alert-login-registro").addClass("d-block");
  //       }
  //     });

  // })



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
          $("#ingresoCorreo").trigger("reset");
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

  // Acceso de usuarios
  // Ingresar por email
  $("#butonIngresarCorreo").click(function (e) {
    e.preventDefault();
    // Mostramos formulario de ingreso por email
    $("#contenedorLogin").hide();
    // Ocultamos boton de ingreso por email
    $("#contenedorRegistar").hide();
    //Mostramos el contenido de la pagina
    $("#contenidoWeb").hide();
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

    // A PARTIR DE AQUI ES LA VERSION INCOMPLETA
    // Si ingresamos por correo y password mostramos formulario de ingreso (DESBLOQUEA ABAJO DE AQUI )
  // $("#butonIngresarCorreo").click(function (e) {
  //   e.preventDefault();
  //   // Capturamos los datos enviados por el formulario de ingreso
  //   // Campo email
  //   var email = $("#ingresoCorreo").val();
  //   // Campo Password
  //   var password = $("#ingresoContraseña").val();

  //     $("#contenedorLogin").hide;
  //     $("#contenedorRegistar").hide;
  //     $("#contenidoWeb").show;
  //   // Metodo que permite ingreso de usarios con email
  //   auth
  //     .signInWithEmailAndPassword(email, password)
  //     .then(userCredential => {
  //       // limpiar formualrio de ingreso
  //       $("#IngresoCorreo").trigger("reset");
        
  //     })
  //     .catch((error) => {// Esto permite capturar el error, se puede trabajar este catch con los codigos de error
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       console.log(errorCode, errorMessage);
  //     });
  //  })
   
  //  // Ingresar con google
  //  $("#butonIngresoGoogle").click(function (e) {
  //   e.preventDefault();
  //   auth.signInWithPopup(provider)
  //     .then(result => {
  //       console.log("Ingreso con Google");
  //     })
  //     .catch(err => {
  //       console.log(err);
    //   })
    // })
    

})
});