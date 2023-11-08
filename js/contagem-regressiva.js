// Seleciona os elementos HTML de entrada e saída:
const contHoras = document.querySelector('#cont-horas');
const contMinutos = document.querySelector('#cont-minutos');
const contSegundos = document.querySelector('#cont-segundos');
const contagem = document.querySelector('#contagem');
const proxExecucao = document.querySelector('#proxima-execucao');

let horario = new Date(Date.now());
const horDef = document.querySelector('#horario-script').value;
const [horaDef, minutosDef] = horDef.split(':');
horario.setTime(Date.now());
horario.setHours(horaDef,minutosDef,0,0);

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

  return false;
});

setInterval(() => {  // Timer para atualização da view
  const msFaltantes = horario.getTime() - Date.now();
  const sFaltantes = msFaltantes / 1000;  // Converte para segundos
  const sTruncado = Math.ceil(sFaltantes);  // Arredonda as casas decimais para cima, pois o contador não mostra os milisegundos
  if (sTruncado > 0) {
    s = sTruncado;
  } else if (sTruncado == 0) {
    s = 0;
    iniciaScript();
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


