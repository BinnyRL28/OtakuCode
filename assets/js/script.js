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
  console.log(app);
});