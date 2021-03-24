

function cadastrarQuestionario() {
    event.preventDefault();
    const url = 'http://localhost:8080/questionarios'
    let titulo = document.getElementById("titulo").value
    let usuario = document.getElementById("usuario").value

    const novoQuestionario = {
        titulo: titulo,
        usuario: usuario
    }

    axios.post(url, novoQuestionario)
        .then(window.location.replace("./novoquestionarioQuest.html"));
        
}


