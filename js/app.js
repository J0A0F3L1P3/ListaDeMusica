auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        window.location.pathname="/ListaDeMusica/html/home.html"
    }
})

let emailCad = document.querySelector("#emailCad")
let senhaCad = document.querySelector("#senhaCad")
let senhaCad2 = document.querySelector("#senhaCad2")

let btnCad =  document.querySelector("#btnCad")

btnCad.addEventListener("click", cadastrar ) 

function cadastrar(){
    if (senhaCad.value === senhaCad2.value) {
        auth.createUserWithEmailAndPassword(emailCad.value, senhaCad.value).
        then(function(user){ console.log(auth.currentUser.email)},
            function(error){ console.log(error.message)})    
    }    
}

let emailEntrar = document.querySelector("#emailEntrar")
let senhaEntrar = document.querySelector("#senhaEntrar")
let btnEntrar =  document.querySelector("#btnEntrar")
let btnGoogle =  document.querySelector("#btnGoogle")

btnEntrar.addEventListener("click", entrar)

function entrar(){
    auth.signInWithEmailAndPassword(emailEntrar.value, senhaEntrar.value)
}

btnGoogle.addEventListener("click", () => {
    let provider = new firebase.auth.GoogleAuthProvider()
    signIn(provider)
})

function signIn(provider) {
    firebase.auth().signInWithPopup(provider)
    .then(function(resultado){
        console.log(resultado)
    }).catch(function(error){
        console.log(error)
        alert("falha na autenticação")
    })
}


