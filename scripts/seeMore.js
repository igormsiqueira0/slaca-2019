export default class seeMore {
	constructor(section, contentToExpand, dots, seeMoreVisual) {
		this.section = document.querySelector(section);
		this.contentToExpand = document.querySelector(contentToExpand);
		this.dots = document.querySelector(dots);
		this.seeMoreVisual = document.querySelector(seeMoreVisual);

		this.expand = this.expand.bind(this);
	}
	expand() {
		this.contentToExpand.classList.toggle('expanded');
		this.dots.classList.toggle('expanded');
		this.seeMoreVisual.classList.toggle('expanded');
	}
	addEvents() {
		this.section.addEventListener('click', this.expand);
	}
	init() {
		this.addEvents();
	}
}
