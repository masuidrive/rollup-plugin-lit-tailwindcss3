import { html, css, LitElement } from 'lit';

export class SimpleComponent extends LitElement {
  static styles = css`
  a { font-family: demo-line; }
  tw_placeholder`;

  render() {
    return html`<h1
      class="text-purple-400 hover:text-green-500 md:text-red-400 md:hover:text-indigo-900"
    >
      Hello, world!
    </h1>`;
  }
}

customElements.define('simple-component', SimpleComponent);
