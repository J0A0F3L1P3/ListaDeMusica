// felipe

auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
        // window.location.pathname = "/html/home.html"
        window.location.pathname="/ListaDeMusica/html/home.html"
    }
})

let emailCad = document.querySelector("#emailCad")
let senhaCad = document.querySelector("#senhaCad")
let senhaCad2 = document.querySelector("#senhaCad2")

let btnCad = document.querySelector("#btnCad")

btnCad.addEventListener("click", cadastrar)

function cadastrar() {
    if (senhaCad.value === senhaCad2.value) {
        auth.createUserWithEmailAndPassword(emailCad.value, senhaCad.value).
            then(function (user) { console.log(auth.currentUser.email) },
                function (error) { alert('erro de cadastro') })
    }
}

let emailEntrar = document.querySelector("#emailEntrar")
let senhaEntrar = document.querySelector("#senhaEntrar")
let btnEntrar = document.querySelector("#btnEntrar")
let btnGoogle = document.querySelector("#btnGoogle")

btnEntrar.addEventListener("click", entrar)

function entrar() {
    auth.signInWithEmailAndPassword(emailEntrar.value, senhaEntrar.value)
}

// capturar evento click no botão Google
btnGoogle.addEventListener("click", () => {
    // criar instancia do objeto Google provider auth
    let provider = new firebase.auth.GoogleAuthProvider()
    signIn(provider)
})

//  funcao para fazer login via firebase com provider (google , github, microsoft)
function signIn(provider) {
    //abrir popup na tela com autenticação do provider
    firebase.auth().signInWithPopup(provider)
        .then(function (resultado) {
            console.log(resultado)
        }).catch(function (error) {
            console.log(error)
            alert("falha na autenticação")
        })
}


