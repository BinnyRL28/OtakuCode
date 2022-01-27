

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

    // Inicializar Auth de Facebook
    var provider2 = new firebase.auth.FacebookAuthProvider();

    // Inicializar
    var storage = firebase.storage();

    // Crear referencia del storage
    var storageRef = storage.ref();
  
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
    //Campo confirmacion Contraseña
    var confirmacion = $("#registroConfirmacionPassword").val();
    //Campo confirmacion Contraseña
    var fullName = $("#registroNombre").val();
    // Metodo de firebase que permite registro de usarios con email

    if (password.length<6) {
      alert(" ⚠️ Deben ser 6 carácteres como mínimo")
    };

    if (password !== confirmacion) {
      auth.stop();
      alert(" ⚠️ Contraseñas distintas")
    }

    auth
    .createUserWithEmailAndPassword(email, password)
    .then(userCredential => {
      console.log("Usuario Creado");
      // ocultar formulario de registro
      $(".registro-usuario").hide();
      // $("#contenidoWeb").show();
      // limpiar formulario de registro
      addFullName(fullName);
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
    $("#contenedorLogin").show();
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
  
    // Ingresar con Facebook
  $("#btnIngresoFacebook").click(function (e) {
    e.preventDefault();
    auth.signInWithPopup(provider2)
      .then(result => {
        console.log("Ingreso con Facebook");
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
    // location.reload;
    if (user) {
      // Si usuario esta conectado
      // ocultamos el login
      $("#contenedor1").hide();
      // ocultamos el formulario de registro
      $(".registro-usuario").hide();
      $("#informacionPagina").hide();
      // mostramos el contenido
      $("#contenidoWeb").show();
      // mostramos los 
      $("#postList").show();
      obtienePost();
      loadUserInfo();
    } else {
      // Si usuario esta desconectado
      // Se oculta formulario de registro
      $(".registro-usuario").hide();
      // Se oculta formulario de ingreso
      $("#contenedorLogin").hide();
      // Se muestra el boton de ingreso por email
      $("#butonIngresoCorreo").show();
      $("#informacionPagina").show();
      // Se oculta contenido de la página
      $("#contenidoWeb").hide();
      $("#postList").hide();
      // Se muestra el login
      $("#contenedor1").show()
      // Se muestra el login
      $("#login").show()
    }
  });

   // Boton enviar formulario post
   $("#btnSendPost").click(function (e) {
    e.preventDefault();
    // Capturo los datos enviados desde el formulario con id "postForm"
    var mensaje = $("#postText").val();

    if (mensaje.length > 0) {
      // Metodo de escritura para añadir elementos a la coleccion "post", 
      // si la coleccion no existe, la crea implicitamente
      var d = new Date();
      var strDate = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
      var strHours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
      const file = document.querySelector("#postFile").files[0];
      const user = firebase.auth().currentUser;

      db.collection("posts").add({
        mensaje: mensaje,
        fecha: strDate,
        hora: strHours,
        date: datePostDB(),
        orderDate : orderDate(),
        idUser: user.uid ,
        userName : user.displayName,
        urltext: ""

      })
        .then((docRef) => {
          console.log("Los datos se guardaron correctamente");
          $("#postForm").trigger("reset");
         var id = docRef.id;
         if (file != null) {
           const name = strDate + "-" + strHours + "-" + file.name;
           agregarImagen(file, name, id);
         }
          obtienePost();
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    } else {
      alert('Favor completar todos los campos');
    }

  });

  //Actualizar publicacion o posteo
  $("#btnSavePost").click(function (e) {
    e.preventDefault();
    //Capturamos los datos enviados
    var mensaje = $("#postText").val();
    var id = $ ("#idPost").val();

    if (mensaje.length > 0) {
      var d = new Date();
      var strDate = d.getDate() + "-" + (d.getMonth()+1) + "-" + d.getFullYear();
      var strHours = d.getHours() + "-" + d.getMinutes() + "-" + d.getSeconds();

      db.collection("posts").doc(id).update({
        mensaje: mensaje,
        fecha: strDate,
        hora: strHours,
        date: datePostDB(),
        orderDate: orderDate(),
      })
      .then(() => {
        console.log("Posteo actualizado correctamente");
        $("postForm").trigger("reset");
        obtienePost();

        $("#btnSendPost").show();
        $("#btnSavePost").hide();

      })
      .catch((error) => {
        console.log("El error en la actualización de los posteos es: ", error);
      });
    }else {
      alert("Por favor completar todos los campos")
    }
  })

  //Va a mostrar los datos en la vista
  function postList(data) {
    const user = firebase.auth().currentUser;
    if(data.length > 0) {
      $("#postList").empty();
      let html = "";
      data.forEach(doc => {
        var post = doc.data();
        var div = ``;
        if (user.uid == post.idUser) {
          div = `
          <div class="card bg-dark text-white mt-3 mx-auto" style="max-width: 800px">
            <div class="card-body">
              <p>${post.mensaje}</p>
              <img src="${post.urltext}" id="imagePost">
              <p>Publicado por ${post.userName}, el ${post.date}</p>
              <button data-id="${doc.id}" class="btn btn-success btn-edit-post bi bi-pencil">
              Editar
              </button>
              <button data-id="${doc.id}" class="btn btn-danger btn-delete-post bi bi-trash">
                Eliminar
              </button>
            </div>
          </div>
          `;
        } else {
          div = `
          <div class="card bg-dark text-white mt-3 mx-auto" style="max-width: 800px">
            <div class="card-body">
              <p>${post.mensaje}</p>
              <img src="${post.urltext}" id="imagePost">
              <p>Publicado por ${post.userName}, el ${post.date}</p>
            </div>
          </div>
          `;
        }
        html += div;
      });
      
      $("#postList").append(html);
      var btnsEdit = document.querySelectorAll(".btn-edit-post");
      btnsEdit.forEach(btn => {
        btn.addEventListener("click", (e) => {
          var id = e.target.dataset.id;
          //Se le pasa el identificador a una funcion para actulizar dicho documento
          obtienePost(id);
        })
      })
      
      var btnsDelete = document.querySelectorAll(".btn-delete-post");
      btnsDelete.forEach(btn => {
        var id = e.target.dataset.id;
        deletePost(id);
      })
    }
  }

  // Consulta y ordena los post del mas nuevo al mas antiguo
  function obtienePost() {
    db.collection("posts").orderBy('orderDate', 'desc').get().then((querySnapshot) => {
      postList(querySnapshot.docs);
    })
  };

  // Consulta y ordena los post del mas nuevo al mas antiguo
  function obtienePost() {
    db.collection("posts").get().then((snapshot) => {
      postList(snapshot.docs);
    })
  };

  //Funcion que actuliza un posteo
  function obtienePost(id) {
    db.collection("posts").doc(id).get().then((doc) => {
      var post = doc.data();
      $("#postText").val(post.mensaje);
      $("#idPost").val(id);
      $("#btnSendPost").hide();
      $("#btnSavePost").removeClass("d-none");
      $("#btnSavePost").show;

    }).catch((error) =>{
      console.log("El error es: ", error);
    })
  }


  

  //Funcion para el eliminar el post
  function deletePost(id) {
    db.collection("posts").doc(id).delete().then(() => {
      // Si se elimina el post
      obtienePost();
      window.location.reload();
    }).catch((error) => {
      console.log("Error al eliminar el posteo", error)
    })

  }

  //Funcion que permite añadir url de la imagen al registro recien creado en firestore
  function agregarImagen(file, name, id){
    const metadata = {
      contentType: file.type
    }
    const uploadTask = storageRef.child(`images/${name}`).put(file, metadata);
    uploadTask.on(firebase.storage.TaskEvent.STAGE_CHANGED,
      (snapshot) => {
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is' + progress + '%done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED:
            console.log(" Upload is paused")
            break;
          case firebase.storage.TaskState.RUNNING:
            console.log(" Upload is running")
            break;
      
        }
      },
      (error) => {
        switch (error.code) {
          case 'storage/unauthorized':
            //El usuario no tiene permiso para acceder al objeto
            break;
          case 'storage/canceled':
            //El usuario cancela la carga
            break;
          case 'storage/unknow':
            //Unknow error ocurred, inspect error.serverResponse
            break;
        }
      },

      async () =>{
        const url = await uploadTask.snapshot.ref.getDownloadURL();
        db.collection("posts").doc(id).update({
          urltext : url
        }).then(() => {
          window.location.reload();
        })
      }
      );
  }

  

  //Funcion para obtener el dia y la hora en español
   const datePostDB = () => {
    const datePost = {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    };
    const timePost = {
      hour12: 'true',
      hour: 'numeric',
      minute: 'numeric',
    };
  
    const date = new Date().toLocaleDateString('es-Es', datePost);
    const time = new Date().toLocaleTimeString('es-Es', timePost);
    const dateTime = `${date} ${time}`;
  
    return dateTime;
  };
  
  const orderDate = () => {
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const month = `0${dateNow.getMonth()}`.slice(-2);
    const day = `0${dateNow.getDate()}`.slice(-2);
    const hour = `0${dateNow.getHours()}`.slice(-2);
    const minute = `0${dateNow.getMinutes()}`.slice(-2);
    const second = `0${dateNow.getSeconds()}`.slice(-2);
    return parseInt(`${year}${month}${day}${hour}${minute}${second}`, 0);
  };


  // Metodo que sirve para mostrar los países en la tabla
  function postList(data) {
    $("#postList").empty();
    if (data.length > 0) {
      let html = '';
      data.forEach(doc => {
        const post = doc.data();
        const div = `
          <div class="card  text-black  mt-4 display-10 p-0" style="border-radius: 1rem; width: 600px;display:block" id="contenedorpostList">
            <div class="card-body" >
              <p>${post.mensaje}</p>
              <p>Publicado el ${post.fecha} a las ${post.hora}</p>
            </div>
          </div>
        `;
        html += div;
      });
      $("#postList").append(html);
    }
  };
;

  function loadUserInfo(){
    const user = firebase.auth().currentUser;
    let html = "";
    if (user !== null ) {
      const displayName = user.displayName;
      const email = user.email;
      var photoURL = "";
      if (user.photoURL != null) {
        photoURL = user.photoURL;
      }else{
        photoURL = "https://toppng.com/uploads/preview/user-font-awesome-nuevo-usuario-icono-11563566658mjtfvilgcs.png";
      }
      const emailVerified = user.emailVerified;
      const uid = user.uid;

      html = 
          `
        <div class="card-body">
          <div>
            <img id="userPhoto" src="${photoURL}" class="rounded-circle" style="width: 100px;"  
          </div>
          <div id="userInfo" class="text-center">
            <h3>"${displayName}</h3>
            <h4>"${email}</h4>
          </div>
        </div>
          `;
      $("userInfo").append(html);
    }
  }

  //Funcion para agregar nombre despues de crear un usuario nuevo
  function addFullName(fullName){
    const user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: fullName
    }).then(() => {
      // Recargo despues de agregar nombre de usuario
      window.location.reload();
    }).catch((error) => {

    });
  }

  
    
});

// /*n  export*/ const addLikeArr = (idPost, uid) => (
//   firebase.firestore().collection('posts').doc(idPost)
//     .update({ likes: firebase.firestore.FieldValue.arrayUnion(uid) })
// );

// // REMOVE LIKE
// /*n  export*/ const removeLikeArr = (idPost, uid) => (
//   firebase.firestore().collection('posts').doc(idPost)
//     .update({ likes: firebase.firestore.FieldValue.arrayRemove(uid) })
// );

var counterVal = 0;

function incrementClick() {
    updateDisplay(++counterVal);
}

function resetCounter() {
    counterVal = 0;
    updateDisplay(counterVal);
}

function updateDisplay(val) {
    document.getElementById("counter-label").innerHTML = val;
}