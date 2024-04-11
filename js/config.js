const firebaseConfig = {
  apiKey: "AIzaSyB8890sv0YPrN1UZ6o94oxwgz-povl02D8",
  authDomain: "etec24-d5e05.firebaseapp.com",
  databaseURL: "https://etec24-d5e05-default-rtdb.firebaseio.com",
  projectId: "etec24-d5e05",
  storageBucket: "etec24-d5e05.appspot.com",
  messagingSenderId: "654710646311",
  appId: "1:654710646311:web:1ca25257a9032073055002",
  measurementId: "G-VRHTJXQ5KH"
};

firebase.initializeApp(firebaseConfig);
let auth = firebase.auth()