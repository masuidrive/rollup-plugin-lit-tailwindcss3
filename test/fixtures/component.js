import { html, css, LitElement } from 'lit';

export class SimpleComponent extends LitElement {
  static styles = css`//tailwindcss
  a { font-family: demo-line; }
  .btn { @apply bg-blue-500; }
`;

  render() {
    return html`<h1
      class="text-purple-400 hover:text-green-500 md:text-red-400 md:hover:text-indigo-900"
    >
      <button class="btn">Hello world</button>
    </h1>`;
  }
}

customElements.define('simple-component', SimpleComponent);
