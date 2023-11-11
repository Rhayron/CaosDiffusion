window.iniciaScript = function iniciaScript() {
  // Alerta de início do script
  let horario = new Date(Date.now());
  let dia = horario.getDate().toString().padStart(2, '0');
  let mes = (horario.getMonth()+1).toString().padStart(2, '0');
  let ano = horario.getFullYear();
  let hora = horario.getHours().toString().padStart(2, '0');
  let minuto = horario.getMinutes().toString().padStart(2, '0');
  let stringHorario = `${dia}/${mes}/${ano} às ${hora}:${minuto}`
  alert(`Iniciando o script... (${stringHorario})`, 'warning');

  // Implementação do script

  // Twitter
  fetch("http://localhost:3000/twitter", {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      tweet: 'Teste',
    })
  })
  .then( (response) => {
  });

  // Alerta de término da execução do script
  alert(`Script finalizado com sucesso (${stringHorario})`, 'success');
}
