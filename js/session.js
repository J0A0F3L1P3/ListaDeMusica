let dados = document.querySelector("#dados")
let perfil = document.querySelector("#perfil")
let foto = document.querySelector("#foto")

auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(auth.currentUser.email + " logado" )
        perfil.innerHTML = auth.currentUser.email
    }
    else {
        //window.location.pathname="/index.html"
        window.location.pathname="/ListaDeMusica/index.html"
    }
})

let btnSair = document.querySelector("#btnSair")
btnSair.addEventListener("click", () => {
   auth.signOut() 
})
