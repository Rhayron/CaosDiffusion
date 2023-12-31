// Seleciona os elementos HTML de entrada e saída:
var contHoras = document.querySelector('#cont-horas');
var contMinutos = document.querySelector('#cont-minutos');
var contSegundos = document.querySelector('#cont-segundos');
var contagem = document.querySelector('#contagem');
var proxExecucao = document.querySelector('#proxima-execucao');

var alertPlaceholder = document.getElementById('alerta')
var alert = (message, type) => {
  var wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

let horario = new Date(Date.now());
fetch('http://localhost:3000/horario', {
  method: 'GET',
}).then(
  res => res.json()
).then(obj => {
  const horaDef = obj.hora;
  const minutosDef = obj.minutos;
  horario.setTime(Date.now());
  horario.setHours(horaDef,minutosDef,0,0);
  document.querySelector('#horario-script').value = `${horaDef}:${minutosDef}`;

  // Quando o botão "Atualizar" for pressionado:
  const formulario = document.querySelector('form');
  formulario.addEventListener('submit', function(e) {

    e.preventDefault();
    e.stopPropagation();

    // Lê o horário digitado pelo usuário:
    const horarioDef = document.querySelector('#horario-script').value;
    const [horaDef, minutosDef] = horarioDef.split(':');
    horario.setTime(Date.now());
    horario.setHours(horaDef,minutosDef,0,0);

    fetch('http://localhost:3000/horario', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:1234'
      },
      body: JSON.stringify({"hora": horaDef, "minutos": minutosDef})
    }).then(
      res => res.json()
    );

    return false;
  });

  setInterval(() => {  // Timer para atualização da view
    const msFaltantes = horario.getTime() - Date.now();
    const sFaltantes = msFaltantes / 1000;  // Converte para segundos
    const sTruncado = Math.ceil(sFaltantes);  // Arredonda as casas decimais para cima, pois o contador não mostra os milisegundos
    if (sTruncado > 0) {
      s = sTruncado;
      exec = true;
    } else if (sTruncado == 0) {
      s = 0;
      if(exec){ // Controle para executar o script uma única vez enquanto sTruncado == 0
        iniciaScript();
        exec = false;
      }
    } else {  // Quando atingir 0, executa o script e reinicia a contagem, acrescentando 1 dia à variável "horario"
      s = 0;
      horario.setTime(horario.getTime() + 24*60*60*1000);
    }

    // Conversão dos segundos para o formato dias:horas:minutos:segundos
    const dias = Math.floor(s / (60 * 60 * 24));
    const diasResto = s % (60 * 60 * 24);

    const horas = Math.floor(diasResto / (60 * 60));
    const horasResto = diasResto % (60 * 60);

    const minutos = Math.floor(horasResto / 60);
    const segundos = horasResto % 60;

    contHoras.innerHTML = horas;
    contMinutos.innerHTML = minutos;
    contSegundos.innerHTML = segundos;

    const dia = horario.getDate().toString().padStart(2, '0');
    const mes = (horario.getMonth()+1).toString().padStart(2, '0');
    const ano = horario.getFullYear();
    const hora = horario.getHours().toString().padStart(2, '0');
    const minuto = horario.getMinutes().toString().padStart(2, '0');
    proxExecucao.innerHTML = `${dia}/${mes}/${ano} às ${hora}:${minuto}`;
  }, 100);
});
