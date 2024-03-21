
listarMusicas()

function listarMusicas() {
    const url = "https://etec24-3dc8c-default-rtdb.firebaseio.com/musicas.json"

    const options = {
        method: "GET",
        mode: 'cors',
        headers: {
            'Accept': 'application/json',
            'content-type': 'application/json;charset=utf-8',
        }
    }

    fetch(url, options)
        .then(response => response.json())
        .then(
            dados => {
                console.log(dados)

                let lista = document.querySelector("#listaMusicas")
                let tbody = lista.querySelector('tbody')

                tbody.innerHTML = '';

                for (let chave in dados) {
                    let item = dados[chave]

                    let linha = document.createElement('tr')
                    linha.innerHTML = `
                    <td>${item.faixa}</td>
                    <td>${item.cantor}</td>
                    <td>${item.estrelas}</td>
                    <td>${item.album}</td>
                    `
                    tbody.appendChild(linha)
                }
            }
        )
}

document.getElementById('filName').addEventListener('input', function () {
    let input, filter, table, tr, td, i, j, txtValue;
    input = document.getElementById("filName");
    filter = input.value.toUpperCase();
    table = document.getElementById("listaMusicas");
    tr = table.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td");
        for (j = 0; j < td.length; j++) {
            txtValue = td[j].textContent || td[j].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
                j=5;
            } else {
                tr[i].style.display = "none";
            }
        }
    }
});
