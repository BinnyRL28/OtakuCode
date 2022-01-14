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


   
})
});