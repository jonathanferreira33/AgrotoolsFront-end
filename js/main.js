
function criaLinha(questionario) {
    console.log(questionario)
    linha = document.createElement("tr");
    tdTitulo = document.createElement("td");
    tdUsuario = document.createElement('td');
    // tdData = document.createElement('td');
    btnResp = document.createElement('button');

   
    tdTitulo.innerHTML = questionario.titulo
    tdUsuario.innerHTML = questionario.usuario
    btnResp. innerHTML = `<a href=""><button>Responder</button><a>` //chamar funcao para pag de resp
    // tdData.innerHTML = questionario.data
    
    
    linha.appendChild(tdTitulo);
    linha.appendChild(tdUsuario);
    // linha.appendChild(tdData);
    linha.appendChild(btnResp)

    return linha;
}


function get(){

    const showdata = (result)=>{

        let tabela = document.getElementById("tabela")
        for(let i=0; i < result.length; i++) {
            let questionarios = result[i]
            let linha = criaLinha(questionarios)
            tabela.appendChild(linha);
                        

            // document.getElementById("questionarios").innerHTML = `

            //     <div class="questionarioDB">
            //         <small>titulo:<p>${questionario.titulo}</p></small>
                    
            //         <small>usuario:<p>${questionario.usuario}</p></small>
            //         <button>Responder</button>
                    
            //     </div>
              
            // `;
            
        }
    }

    const options = { 
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    let dados = fetch("http://localhost:8080/questionarios", options)
    .then((response) => {
        response.json()
        .then(data => showdata(data))
    })
    .catch(e => console.log('Erro: ' + e.message))
}

document.body.onload = get();