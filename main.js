import './style.css';

const template = document.createElement('template');
template.innerHTML = `
<style>
.main-main {
  font-family: 'Arial', sans-serif;
  background: #f4f4f4;
  width: 500px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  margin-bottom: 15px;
  border-bottom: darkorchid 5px solid;
}

.main-main img {
  width: 100%;
}

.main-main button {
  cursor: pointer;
  background: darkorchid;
  color: #fff;
  border: 0;
  border-radius: 5px;
  padding: 5px 10px;
}
</style>
<div class='main-main'>
<img />
<div>
<h3></h3>
<div class="info">
<p><slot name="email" /></p>
  <label for="newComment" name="newComment">Add your comment below</label>
  <textarea id="newComment"></textarea>
  <button id="addComment">Add Comment</button>
</div>
<button id="toggle-info">Hide info</button>
</div>
</div>`;

class mainMain extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');
    this.innerHTML = '';
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const togglebtn = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      info.style.display = 'block';
      togglebtn.innerText = 'Hide Info';
    } else {
      info.style.display = 'none';
      togglebtn.innerText = 'Show Info';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}

window.customElements.define('main-main', mainMain);

document.querySelector('#app').innerHTML = `
<main-main name="Qmani" avatar="https://randomuser.me/api/portraits/men/1.jpg">
<div slot="email">qmani@gmail.com</div></main-main>
<main-main name="Keyno" avatar="https://randomuser.me/api/portraits/men/1.jpg">
<div slot="email">keyno@gmail.com</div></main-main>
<main-main name="Sheila" avatar="https://randomuser.me/api/portraits/women/1.jpg">
<div slot="email">sheila@gmail.com</div></main-main>

  
`;
