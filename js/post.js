function cadastrarQuestionario() {
    event.preventDefault();
    const url = 'http://localhost:8080/questionarios'
    let titulo = document.getElementById("titulo").value
    let usuario = document.getElementById("usuario").value
    console.log('Titulo: ' + titulo)
    console.log('usuario: ' + usuario)

    const novoQuestionario = {
        titulo: titulo,
        usuario: usuario
    }

    axios.post("http://localhost:8080/questionarios", novoQuestionario)
        .then(window.location.replace("./questionarios.html"));

    

}


