// Seleciona os elementos HTML de entrada e saída:
const contDias = document.querySelector('#cont-dias');
const contHoras = document.querySelector('#cont-horas');
const contMinutos = document.querySelector('#cont-minutos');
const contSegundos = document.querySelector('#cont-segundos');
const contagem = document.querySelector('#contagem');
const nomeEvento = document.querySelector('#nome-evento');

fetch('http://localhost:3000/evento', {
  method: 'GET',
}).then(
  res => res.json()
).then(obj => {
  const data = new Date(obj.data);
  const nome = obj.nome;
  nomeEvento.innerHTML = nome;

  setInterval(() => {  // Timer para atualização da view
    const msAteReveillon = data.getTime() - Date.now();
    const sAteReveillon = msAteReveillon / 1000;  // Converte para segundos
    const sTruncado = Math.ceil(sAteReveillon);  // Arredonda as casas decimais para cima, pois o contador não mostra os milisegundos
    if (sTruncado > 0) {
      s = sTruncado;
    } else {  // Quando atingir 0, para a contagem em 0 e muda a cor do fundo
      s = 0;
      contagem.classList.add('bg-success');
      contagem.classList.remove('bg-dark');
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
});


