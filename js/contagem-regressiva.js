// Seleciona os elementos HTML de entrada e saída:
const contDias = document.querySelector('#cont-dias');
const contHoras = document.querySelector('#cont-horas');
const contMinutos = document.querySelector('#cont-minutos');
const contSegundos = document.querySelector('#cont-segundos');
const contagem = document.querySelector('#contagem');
const nomeEvento = document.querySelector('#nome-evento');

let horario = new Date(Date.now());
horario.setHours(12,0,0,0);

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

  contDias.innerHTML = dias;
  contHoras.innerHTML = horas;
  contMinutos.innerHTML = minutos;
  contSegundos.innerHTML = segundos;
}, 100);


