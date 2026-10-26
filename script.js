document.getElementById('year').textContent = new Date().getFullYear();

const telefone = document.getElementById('telefone');
const status = document.getElementById('form-status');

function formatarTelefone(valor) {
  const numeros = valor.replace(/\D/g, '').slice(0, 11);
  if (!numeros) return '';
  if (numeros.length < 3) return '(' + numeros;
  const ddd = '(' + numeros.slice(0, 2) + ') ';
  const restante = numeros.slice(2);
  if (restante.length <= 4) return ddd + restante;
  const parteInicial = restante.length <= 8 ? 4 : 5;
  return ddd + restante.slice(0, parteInicial) + '-' + restante.slice(parteInicial);
}

telefone.addEventListener('input', () => {
  telefone.value = formatarTelefone(telefone.value);
  telefone.setCustomValidity('');
});
telefone.addEventListener('blur', () => {
  const quantidade = telefone.value.replace(/\D/g, '').length;
  telefone.setCustomValidity(quantidade && quantidade !== 10 && quantidade !== 11
    ? 'Informe um telefone válido com DDD.' : '');
});

document.getElementById('quote-form').addEventListener('submit', function(event) {
  event.preventDefault();
  const value = id => document.getElementById(id).value.trim();
  const fields = ['nome', 'telefone', 'bairro', 'servico', 'detalhes'];
  if (!fields.every(value)) {
    status.textContent = 'Preencha todos os campos obrigatórios.';
    return;
  }
  const digitos = value('telefone').replace(/\D/g, '');
  if (digitos.length !== 10 && digitos.length !== 11) {
    telefone.setCustomValidity('Informe um telefone válido com DDD.');
    telefone.reportValidity();
    return;
  }
  const msg = 'Olá! Gostaria de solicitar um orçamento.\n\nNome: ' + value('nome') +
    '\nMeu WhatsApp: ' + value('telefone') +
    '\nBairro/cidade: ' + value('bairro') +
    '\nServiço: ' + value('servico') +
    '\nDescrição: ' + value('detalhes');
  const url = 'https://wa.me/5511982572810?text=' + encodeURIComponent(msg);
  status.textContent = 'Abrindo WhatsApp para enviar seu pedido...';
  window.open(url, '_blank', 'noopener,noreferrer');
});
