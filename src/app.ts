class ProjectInput {
	templateElement: HTMLTemplateElement;
	hostElement: HTMLDivElement;
	element: HTMLFormElement;
	titleInputElement: HTMLInputElement;
	descriptionInputElement: HTMLInputElement;
	peopleInputElement: HTMLInputElement;

	constructor() {
		/* TS doesn't know what kind of HTML element it will get and it's requiring 'content' property
    to fix this is type-casting, two ways for syntax:
    1. this.templateElement = <HTMLTemplateElement> document.getElementById('project-input')!;
    2. this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
*/
		this.templateElement = document.getElementById("project-input")! as HTMLTemplateElement;
		this.hostElement = document.getElementById("app")! as HTMLDivElement;

		// importNode(pointer to template element.content, import deepclone? )
		// this is a fragment of the DOM element
		const importedNode = document.importNode(this.templateElement.content, true);
		// this is a concrete property that point to a node we want to insert
		this.element = importedNode.firstElementChild as HTMLFormElement;
		this.element.id = "user-input";

		this.titleInputElement = this.element.querySelector("#title") as HTMLInputElement;
		this.descriptionInputElement = this.element.querySelector("#description") as HTMLInputElement;
		this.peopleInputElement = this.element.querySelector("#people") as HTMLInputElement;

		this.configure();
		this.attach();
	}

	private attach() {
		this.hostElement.insertAdjacentElement("afterbegin", this.element);
	}

	// return type is string, string, number OR void, if the input does't pass validation and funtion returns nothing
	private gatherUserInput(): [string, string, number] | void {
		// handle all inputs data
		const enteredTitle = this.titleInputElement.value;
		const enteredDescription = this.descriptionInputElement.value;
		const enteredPeople = this.peopleInputElement.value;

		//validation

		if (
			enteredTitle.trim().length === 0 ||
			enteredDescription.trim().length === 0 ||
			enteredPeople.trim().length === 0
		) {
			console.log("one of the input is invalid");
		} else {
			return [enteredTitle, enteredDescription, +enteredPeople];
		}
	}

	private clearInputs() {
		this.titleInputElement.value = "";
		this.descriptionInputElement.value = "";
		this.peopleInputElement.value = "";
	}

	private submithandler(event: Event) {
		// function to be called on submit event
		event.preventDefault();
		const userInput = this.gatherUserInput();
		if (Array.isArray(userInput)) {
			const [title, description, people] = userInput;
			console.log(title, description, people);
			this.clearInputs();
		}
	}

	private configure() {
		this.element.addEventListener("submit", this.submithandler.bind(this));
	}
}

const prjInput = new ProjectInput();
