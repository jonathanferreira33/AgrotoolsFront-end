
let key = 'item 1';
localStorage.setItem(key, 'value');

var idQuestionario = 0;
function gerarQuestionario(){
    const showdata = (result)=> {
        let questionarioAtual = result.pop()
        idQuestionario = questionarioAtual.id;
        var tituloQuestionario = questionarioAtual.titulo;       
        var usuarioQuestionario = questionarioAtual.usuario;
        
        document.getElementById('titulo').innerHTML = tituloQuestionario; 
        document.getElementById('usuario').innerHTML = usuarioQuestionario; 
        document.getElementById('id').innerHTML = idQuestionario;
        
        document.querySelector('.novaQuestao').innerHTML = `
            <form class="formNQ" onsubmit="cadastrarQuestao(${idQuestionario})">
            <input type="text" id="questao" name="questao">
            <button type="submit" onclick="abrirModal()" class="btn open-modal">Enviar</button>
            </form>
        `
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


function cadastrarQuestao() {
    event.preventDefault();
    const url = 'http://localhost:8080/questionarios/pergunta'
    let id = idQuestionario;
    let questao = document.getElementById("questao").value;
    let resposta = ''

    const novoQuestionario = {
        questionario: {
            id: id
        },
        questao: questao,
        resposta : resposta
    }

    axios.post(url, novoQuestionario)
        // .then(window.location.replace("./novoquestionarioQuest.html"));
        .then(console.log('ok'))
        
}

function novaQuestao() {
    $( ".form:first" ).clone().appendTo(".form");
  }

function abrirModal(){
    document.getElementById('modal').style.top = "0";

}

function fecharModal(){
    document.getElementById('modal').style.top = "-100%";
    
}

function limparQuestao(){
    fecharModal();
    document.getElementById("questao").value = "";
}

  
document.onload = gerarQuestionario();