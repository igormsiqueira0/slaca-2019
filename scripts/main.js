import seeMore from './seeMore.js';
import {
	criarTopico,
	enviarTopico,
	inserirTopicos,
	expandRespostas,
} from './discussoes.js';

const verMais = new seeMore(
	'.resumo',
	'[data-role="more-content"]',
	'[data-role="dots"]',
	'[data-role="see-more"]'
);
verMais.init();

const discussoesCriar = new criarTopico(
	'[data-role="criar"]',
	'.criar-topico',
	'.criando-topico'
);
discussoesCriar.init();

const topicos = new inserirTopicos('../topicos.json', '.topicos-lista');
topicos.init();

const enviarPergunta = new enviarTopico(
	'.criando-topico--controls--enviar',
	'.criando-topico',
	'.topico-sucesso',
	'.topico.waiting',
	'.criar-novo-topico'
);
enviarPergunta.init();

setTimeout(() => {
	expandRespostas('.topico--main');
}, 1000);

// prevenir padrão de form

const forms = [...document.forms];
forms.forEach((form) => {
	form.addEventListener('submit', (e) => {
		e.preventDefault();
	});
});
