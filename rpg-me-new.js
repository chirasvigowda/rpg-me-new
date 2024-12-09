import { LitElement, html, css } from "lit";
import "@haxtheweb/rpg-character";
import "wired-elements";

export class RpgMeNew extends LitElement {
  static get tag() {
    return "rpg-me-new";
  }

  static get properties() {
    return {
      seed: { type: String, reflect: true },
      literalseed: { type: Boolean, reflect: true },
      accessories: { type: Number },
      base: { type: Number },
      face: { type: Number },
      faceitem: { type: Number },
      hair: { type: Number },
      pants: { type: Number },
      shirt: { type: Number },
      skin: { type: Number },
      hatcolor: { type: Number },
      hat: { type: String },
      fire: { type: Boolean },
      walking: { type: Boolean },
      height: { type: Number },
      width: { type: Number }
    };
  }

  constructor() {
    super();
    this.seed = "";
    this.literalseed = false;
    this.accessories = 0;
    this.base = 0;
    this.face = 0;
    this.faceitem = 0;
    this.hair = 0;
    this.pants = 0;
    this.shirt = 0;
    this.skin = 0;
    this.hatcolor = 0;
    this.hat = "none";
    this.fire = false;
    this.walking = false;
    this.height = 500;
    this.width = 500;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background-image: linear-gradient(#eee 1px, transparent 1px),
          linear-gradient(90deg, #eee 1px, transparent 1px);
        background-size: 20px 20px;
        padding: 2em;
      }
      
      wired-combo {
        display: block;
        width: 200px;
        margin-bottom: 1em;
        background: transparent;
        --wired-combo-popup-bg: white;
      }

      wired-item {
        padding: 8px;
        background: white;
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
      }
      
      .title {
        text-align: center;
        font-size: 2em;
        margin-bottom: 0.5em;
      }
      
      .description {
        text-align: center;
        margin-bottom: 2em;
      }
      
      .layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2em;
      }
      
      @media (min-width: 768px) {
        .layout {
          grid-template-columns: 1fr 1fr;
        }
      }
      
      .preview {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      
      .controls {
        display: flex;
        flex-direction: column;
        gap: 1em;
      }
      
      .control-group {
        margin-bottom: 1em;
      }

      .control-label {
        display: block;
        margin-bottom: 0.5em;
        font-weight: bold;
      }

      .checkbox-group {
        display: flex;
        gap: 2em;
        margin: 1em 0;
      }
      
      .buttons {
        display: flex;
        gap: 1em;
        margin-top: 2em;
      }

      wired-card {
        padding: 16px;
        --wired-card-bg-color: white;
      }

      .character-preview {
        width: 500px;
        height: 500px;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .form-group {
        margin-bottom: 1.5em;
      }

      .form-group label {
        display: block;
        margin-bottom: 0.5em;
      }

      wired-button {
        margin-right: 8px;
      }
    `;
  }

  handlePropertyChange(prop, value) {
    this[prop] = value;
    this.requestUpdate();
    this.updateComplete.then(() => {
      this.dispatchEvent(new CustomEvent('character-updated', {
        detail: {
          property: prop,
          value: value
        },
        bubbles: true,
        composed: true
      }));
    });
  }

  generateLiteralSeed() {
    return `${this.accessories}${this.base}${this.face}${this.faceitem}${this.hair}${this.pants}${this.shirt}${this.skin}${this.hatcolor}`;
  }

  reset() {
    this.seed = "";
    this.literalseed = false;
    this.accessories = 0;
    this.base = 0;
    this.face = 0;
    this.faceitem = 0;
    this.hair = 0;
    this.pants = 0;
    this.shirt = 0;
    this.skin = 0;
    this.hatcolor = 0;
    this.hat = "none";
    this.fire = false;
    this.walking = false;
  }

  render() {
    return html`
      <div class="container">
        <h1 class="title">rpg-me</h1>
        <p class="description">Build your own rpg character!</p>
        
        <div class="layout">
          <div class="preview">
            <wired-card elevation="2">
              <div class="character-preview">
                <rpg-character
                  .seed="${this.seed}"
                  ?literalseed="${this.literalseed}"
                  .accessories="${this.accessories}"
                  .base="${this.base}"
                  .face="${this.face}"
                  .faceitem="${this.faceitem}"
                  .hair="${this.hair}"
                  .pants="${this.pants}"
                  .shirt="${this.shirt}"
                  .skin="${this.skin}"
                  .hatcolor="${this.hatcolor}"
                  .hat="${this.hat}"
                  ?fire="${this.fire}"
                  ?walking="${this.walking}"
                  .height="${this.height}"
                  .width="${this.width}"
                ></rpg-character>
              </div>
            </wired-card>
          </div>

          <div class="controls">
            <wired-card>
              <div class="control-group">
                <div class="form-group">
                  <label class="control-label">Accessory</label>
                  <wired-combo
                    .selected="${this.accessories.toString()}"
                    @selected="${(e) => this.handlePropertyChange('accessories', parseInt(e.detail.selected))}"
                  >
                    ${[...Array(10)].map((_, i) => html`
                      <wired-item value="${i}">Accessory ${i}</wired-item>
                    `)}
                  </wired-combo>
                </div>

                <div class="form-group">
                  <label class="control-label">Hat</label>
                  <wired-combo
                    .selected="${this.hat}"
                    @selected="${(e) => this.handlePropertyChange('hat', e.detail.selected)}"
                  >
                    ${["none", "bunny", "coffee", "construction", "cowboy", 
                      "education", "knight", "ninja", "party", "pirate", "watermelon"].map(hat => html`
                      <wired-item value="${hat}">${hat}</wired-item>
                    `)}
                  </wired-combo>
                </div>

                <div class="checkbox-group">
                  <div>
                    <wired-checkbox
                      ?checked="${this.fire}"
                      @change="${(e) => this.handlePropertyChange('fire', e.target.checked)}"
                    >On Fire?</wired-checkbox>
                  </div>
                  
                  <div>
                    <wired-checkbox
                      ?checked="${this.walking}"
                      @change="${(e) => this.handlePropertyChange('walking', e.target.checked)}"
                    >Walking?</wired-checkbox>
                  </div>
                </div>

                <div class="buttons">
                  <wired-button @click="${() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out my RPG character!')}`)}">
                    Share on X
                  </wired-button>
                  <wired-button @click="${() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`)}">
                    Share on LinkedIn
                  </wired-button>
                  <wired-button @click="${this.reset}">
                    Reset
                  </wired-button>
                </div>
              </div>
            </wired-card>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define(RpgMeNew.tag, RpgMeNew);