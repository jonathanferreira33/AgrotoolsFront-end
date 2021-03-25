var idQuestionario = 0;
let key = 0;
let id = localStorage.getItem(key);
console.log('linha4: ' + id);


function criaLinha(questionario) {
    linha = document.createElement("tr");
    tdTitulo = document.createElement("td");
    tdUsuario = document.createElement('td');
    // tdData = document.createElement('td');
    btnResp = document.createElement('button');

    let idQuestionarioAtual = questionario.id;
    tdTitulo.innerHTML = questionario.titulo;
    tdUsuario.innerHTML = questionario.usuario;
    btnResp. innerHTML = `<a onclick="salvarId(${idQuestionarioAtual})">Responder<a>`
    // tdData.innerHTML = questionario.data
    
    linha.appendChild(tdTitulo);
    linha.appendChild(tdUsuario);
    // linha.appendChild(tdData);
    linha.appendChild(btnResp)

    return linha;
}

function salvarId(id) {
    key = id;
    localStorage.setItem(key, 'value');
    console.log('linha 51: ' + key)
    abrirModal()
}

function get(){
    const showdata = (result)=>{
        let tabela = document.getElementById("tabela")
        for(let i=0; i < result.length; i++) {
            let questionarios = result[i]
            let linha = criaLinha(questionarios)
            tabela.appendChild(linha);
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

function abrirModal(){
    console.log('modal aberto')
    document.getElementById('modal').style.top = "0";
    gerarQuestionario()
    getLocation()

}

function fecharModal(){
    document.getElementById('modal').style.top = "-100%";
    localStorage.removeItem(key)
    
}

function gerarQuestionario(){
    const showData = (result)=> {
        let tituloQuestionario = result.titulo;
        document.getElementById('tituloQuest').innerHTML = tituloQuestionario;

            if(result.questoes.length > 0){ 
                for(let i = 0; i < result.questoes.length; i++) {
                    let questaoAtual = result.questoes[i].questao
                    let respostaAtual = result.questoes[i].resposta // questão
                    let tabelaQuestoes = document.getElementById("tabelaRespostas")


                    linha = document.createElement("tr");
                    tituloQuestao = document.createElement("td")
                    textAreaResp = document.createElement('textarea');
                    btnResp = document.createElement('button');
                    
                    linha.innerHTML = questaoAtual;
                    textAreaResp.innerHTML = respostaAtual;
                    btnResp.innerHTML = `<a onclick="atualizarQuestao(${id})">Responder<a>`


                    linha.appendChild(textAreaResp);
                    linha.appendChild(btnResp);

                    
                    tabelaQuestoes.appendChild(linha)
                    return linha;
                }
                
            }else {
                alert("Não há questões cadastradas!")
            }
    }
    
    const options = { 
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    
    let dados = fetch(`http://localhost:8080/questionarios/${key}`, options)
    .then(response => {
        response.json()
        .then(data => showData(data))
        
    })
    .catch(e => console.log('Erro: ' + e.message))
}

function atualizarQuestao(key) {
    event.preventDefault();
    const url = 'http://localhost:8080/questionarios/pergunta'
    let id = key;
    let questao = document.getElementById("questao").value;
    let resposta = ''

    const atualizarResp = {
        questionario: {
            id: key
        },
        questao: questao,
        resposta : resposta
    }

    axios.put(url, atualizarResp)
        // .then(window.location.replace("./novoquestionarioQuest.html"));
        .then(console.log('ok'))
        
}

function getLocation(){
    if(!navigator.geolocation){
        return null;
    }else{
        navigator.geolocation.getCurrentPosition((pos)=>{
            document.getElementById("lat").innerHTML = pos.coords.latitude;
            document.getElementById("lon").innerHTML = pos.coords.longitude;
        })
    }
}



document.body.onload = get();