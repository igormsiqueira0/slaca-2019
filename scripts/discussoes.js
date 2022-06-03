export class criarTopico {
	constructor(btn, intro, editing) {
		this.btn = document.querySelector(btn);
		this.intro = document.querySelector(intro);
		this.editing = document.querySelector(editing);

		this.toggleEditing = this.toggleEditing.bind(this);
	}

	toggleEditing() {
		this.intro.classList.add('editing');
		this.editing.classList.add('editing');
	}
	addEvents() {
		this.btn.addEventListener('click', this.toggleEditing);
	}
	init() {
		this.addEvents();
	}
}

export class enviarTopico {
	constructor(
		btnEnviar,
		sectionCriar,
		sectionEnviado,
		topicoEnviado,
		btnCriarNovo
	) {
		this.btnEnviar = document.querySelector(btnEnviar);
		this.sectionCriar = document.querySelector(sectionCriar);
		this.sectionEnviado = document.querySelector(sectionEnviado);
		this.topicoEnviado = document.querySelector(topicoEnviado);
		this.btnCriarNovo = document.querySelector(btnCriarNovo);

		this.visuallySendTopic = this.visuallySendTopic.bind(this);
		this.criarNovoTopico = this.criarNovoTopico.bind(this);
	}

	visuallySendTopic() {
		this.sectionCriar.classList.toggle('enviado');
		this.sectionEnviado.classList.toggle('enviado');
		this.topicoEnviado.classList.toggle('enviado');
	}
	criarNovoTopico() {
		this.sectionCriar.classList.toggle('enviado');
		this.topicoEnviado.classList.toggle('enviado');
		this.sectionEnviado.classList.toggle('enviado');
	}
	addEvents() {
		this.btnEnviar.addEventListener('click', this.visuallySendTopic);
		this.btnCriarNovo.addEventListener('click', this.criarNovoTopico);
	}
	init() {
		this.addEvents();
	}
}

export class inserirTopicos {
	constructor(url, lista) {
		this.url = url;
		this.lista = document.querySelector(lista);
	}

	async fetchData() {
		const data = await (await fetch(this.url)).json();
		this.inserirDados(data);
	}
	inserirDados(data) {
		data.forEach((topico) => {
			const newTopic = document.createElement('li');
			newTopic.innerHTML = `
      <div class="topico--main">
          <h3>${topico.assunto}</h3>
          <p class="topico--usuario">${topico.usuario}</p>
          <p class="topico--pergunta">${topico.pergunta}</p>
          <div class="topico--opcoes">
            <button class="topico--opcoes--btn topico--opcoes--btn--more"></button>
            <button class="topico--opcoes--btn topico--opcoes--btn--like"></button>
            <p class="topico--likes">${topico.likes} ${
				topico.likes === 1 ? 'like' : 'likes'
			}</p>
            <p class="topico--num-respostas">${topico.respostas.length} ${
				topico.respostas.length === 1 ? 'resposta' : 'respostas'
			}</p>
        </div>
      </div>
      `;
			newTopic.classList.add('topico');

			const respostasLista = document.createElement('ul');
			respostasLista.classList.add('respostas-lista');
			topico.respostas.forEach((resposta) => {
				const respostaElement = document.createElement('li');
				if (resposta.funcao !== 'Usuário da pergunta') {
					respostaElement.classList.add('autoridade');
				}
				respostaElement.innerHTML = `
          ${
						resposta.funcao === 'Usuário da pergunta'
							? ''
							: `<span>${resposta.funcao}</span>`
					}
          <p class="resposta-usuario">${resposta.usuario}</p>
          <p class="resposta-txt">${resposta.resposta}</p>
        `;

				respostasLista.appendChild(respostaElement);
			});

			newTopic.appendChild(respostasLista);
			this.lista.appendChild(newTopic);
		});
	}
	init() {
		this.fetchData();
	}
}

export function expandRespostas(seletor) {
	const topicoElements = document.querySelectorAll(seletor);

	function handleClick(e, index) {
		const topicos = document.querySelectorAll('.topico');

		const respostasLista = topicos[index + 1].querySelector('.respostas-lista');
		respostasLista.classList.toggle('active');
	}

	topicoElements.forEach((topicoEl, index) => {
		topicoEl.addEventListener('click', (event) => {
			handleClick(event, index);
		});
	});
}
