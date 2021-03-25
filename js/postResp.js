

function gerarQuestionario(){
    const showdata = (result)=> {
        console.log(result);
        
        let test = result[id].questoes[0].questao;

        for(let j = 0; j < result.length; j++) {
            let questionarioAtual = result[id].titulo; // titulo questionario
            console.log(questionarioAtual);
            document.getElementById('tituloQuest').innerHTML = usuarioQuestionario;
            

            
            if(result[j].questoes.length > 0){ 
                for(let i = 0; i < result[id].questoes.length; i++) {
                    let questaoAtual = result[id].questoes[i].questao //titulo questão
                    document.getElementById('tituloQuest').innerHTML = usuarioQuestionario;
                        
                }
                
            }

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


function atualizarQuestao() {
    event.preventDefault();
    const url = 'http://localhost:8080/questionarios/pergunta'
    let id = idQuestionario;
    let questao = document.getElementById("questao").value;
    let resposta = ''

    const atualizarResp = {
        questionario: {
            id: id
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

gerarQuestionario();