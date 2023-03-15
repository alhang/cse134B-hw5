class ButtonCount extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: "open" });

        let clicker = document.createElement("button");
        let count = 0;
        
        clicker.addEventListener('click', () => {
            count++;
            clicker.innerText = "Times Clicked: "+count;
        });

        clicker.innerText = "Times Clicked: "+count;

        this.shadowRoot.append(clicker);
    }
}

customElements.define("button-count", ButtonCount);