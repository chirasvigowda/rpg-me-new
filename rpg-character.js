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
      faceItem: { type: Number },
      hair: { type: Number },
      pants: { type: Number },
      shirt: { type: Number },
      skin: { type: Number }, 
      hatColor: { type: Number },
      hat: { type: String },
      fire: { type: Boolean },
      walking: { type: Boolean },
      circle: { type: Boolean },
      height: { type: Number },
      width: { type: Number }
    };
  }

  constructor() {
    super();
    this.seed = "";
    this.literalseed = false;
    this.accessories = 0;
    this.base = 1;
    this.face = 0;
    this.faceItem = 0;
    this.hair = 0;
    this.pants = 0;
    this.shirt = 0;
    this.skin = 0; 
    this.hatColor = 0;
    this.hat = "none";
    this.fire = false;
    this.walking = false;
    this.circle = false;
    this.height = 500;
    this.width = 500;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        --primary-bg: #ffffff;
        --secondary-bg: #f5f5f5;
        --accent-color: #4a90e2;
        --text-primary: #2c3e50;
        --text-secondary: #6c757d;
        --spacing-unit: 8px;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }

      .container {
        max-width: 1400px;
        margin: 0 auto;
        padding: calc(var(--spacing-unit) * 4);
      }

      .header {
        text-align: center;
        margin-bottom: calc(var(--spacing-unit) * 6);
      }

      .title {
        font-size: 2.5rem;
        color: var(--text-primary);
        margin: 0;
        margin-bottom: calc(var(--spacing-unit) * 2);
      }

      .subtitle {
        font-size: 1.2rem;
        color: var(--text-secondary);
        margin: 0;
      }

      .layout {
        display: grid;
        grid-template-columns: 1fr;
        gap: calc(var(--spacing-unit) * 4);
        margin-bottom: calc(var(--spacing-unit) * 4);
      }

      @media (min-width: 768px) {
        .layout {
          grid-template-columns: 1.2fr 0.8fr;
        }
      }

      .preview-section {
        background: var(--primary-bg);
        border-radius: calc(var(--spacing-unit) * 2);
        padding: calc(var(--spacing-unit) * 4);
      }

      .character-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: calc(var(--spacing-unit) * 3);
      }

      .character-preview {
        width: 100%;
        max-width: 600px;
        aspect-ratio: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: var(--secondary-bg);
        border-radius: calc(var(--spacing-unit) * 2);
      }

      .seed-display {
        font-family: monospace;
        font-size: 1rem;
        color: var(--text-secondary);
        background: var(--secondary-bg);
        padding: calc(var(--spacing-unit) * 1.5);
        border-radius: calc(var(--spacing-unit));
        text-align: center;
        width: 100%;
      }

      .controls-section {
        background: var(--secondary-bg);
        border-radius: calc(var(--spacing-unit) * 2);
        padding: calc(var(--spacing-unit) * 4);
      }

      .control-group {
        margin-bottom: calc(var(--spacing-unit) * 4);
      }

      .control-label {
        display: block;
        font-weight: 600;
        color: var(--text-primary);
        margin-bottom: calc(var(--spacing-unit) * 2);
      }

      wired-combo {
        width: 100%;
        margin-bottom: calc(var(--spacing-unit) * 2);
      }

      .checkbox-group {
        display: flex;
        gap: calc(var(--spacing-unit) * 4);
        margin: calc(var(--spacing-unit) * 3) 0;
      }

      .actions {
        display: flex;
        flex-wrap: wrap;
        gap: calc(var(--spacing-unit) * 2);
        justify-content: center;
        margin-top: calc(var(--spacing-unit) * 4);
      }
    `;
  }

  handlePropertyChange(prop, value) {
    this[prop] = value;
    this.requestUpdate();
    this.dispatchEvent(new CustomEvent('character-updated', {
      detail: {
        property: prop,
        value: value
      },
      bubbles: true,
      composed: true
    }));
  }

  generateLiteralSeed() {
    return `${this.accessories}${this.face}${this.faceItem}${this.hair}${this.pants}${this.shirt}${this.skin}${this.hatColor}`;
  }

  reset() {
    this.seed = "";
    this.literalseed = false;
    this.accessories = 0;
    this.base = 1;
    this.face = 0;
    this.faceItem = 0;
    this.hair = 0;
    this.pants = 0;
    this.shirt = 0;
    this.skin = 0; 
    this.hatColor = 0;
    this.hat = "none";
    this.fire = false;
    this.walking = false;
    this.circle = false;
  }

  shareOnTwitter() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent('Check out my RPG character!')}&url=${encodeURIComponent(window.location.href)}`);
  }

  shareOnLinkedIn() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`);
  }

  render() {
    return html`
      <div class="container">
        <header class="header">
          <h1 class="title">RPG Character Creator</h1>
          <p class="subtitle">Design your own unique RPG character!</p>
        </header>
        
        <div class="layout">
          <section class="preview-section">
            <wired-card elevation="3">
              <div class="character-container">
                <div class="character-preview">
                  <rpg-character
                    .seed="${this.seed}"
                    ?literalseed="${this.literalseed}"
                    .accessories="${this.accessories}"
                    .base="${this.base}"
                    .face="${this.face}"
                    .faceItem="${this.faceItem}"
                    .hair="${this.hair}"
                    .pants="${this.pants}"
                    .shirt="${this.shirt}"
                    .skin="${this.skin}"
                    .hatColor="${this.hatColor}"
                    .hat="${this.hat}"
                    ?fire="${this.fire}"
                    ?walking="${this.walking}"
                    ?circle="${this.circle}"
                    .height="${this.height}"
                    .width="${this.width}"
                  ></rpg-character>
                </div>
                <div class="seed-display">
                  Character Seed: ${this.seed || this.generateLiteralSeed() || 'Generate a character to see seed'}
                </div>
              </div>
            </wired-card>
          </section>

          <section class="controls-section">
            <wired-card elevation="2">
              <div class="control-group">
                <label class="control-label">Face (0-5)</label>
                <wired-combo
                  .selected="${this.face.toString()}"
                  @selected="${(e) => this.handlePropertyChange('face', parseInt(e.detail.selected))}"
                >
                  ${[...Array(6)].map((_, i) => html`
                    <wired-item value="${i}">Style ${i}</wired-item>
                  `)}
                </wired-combo>
              </div>

              <div class="control-group">
                <label class="control-label">Face Item (0-9)</label>
                <wired-combo
                  .selected="${this.faceItem.toString()}"
                  @selected="${(e) => this.handlePropertyChange('faceItem', parseInt(e.detail.selected))}"
                >
                  ${[...Array(10)].map((_, i) => html`
                    <wired-item value="${i}">Style ${i}</wired-item>
                  `)}
                </wired-combo>
              </div>

              <div class="control-group">
                <label class="control-label">Hair (0-9)</label>
                <wired-combo
                  .selected="${this.hair.toString()}"
                  @selected="${(e) => this.handlePropertyChange('hair', parseInt(e.detail.selected))}"
                >
                  ${[...Array(10)].map((_, i) => html`
                    <wired-item value="${i}">Style ${i}</wired-item>
                  `)}
                </wired-combo>
              </div>

              <div class="control-group">
                <label class="control-label">Accessories (0-9)</label>
                <wired-combo
                  .selected="${this.accessories.toString()}"
                  @selected="${(e) => this.handlePropertyChange('accessories', parseInt(e.detail.selected))}"
                >
                  ${[...Array(10)].map((_, i) => html`
                    <wired-item value="${i}">Style ${i}</wired-item>
                  `)}
                </wired-combo>
              </div>

              <div class="control-group">
                <label class="control-label">Pants (0-9)</label>
                <wired-combo
                  .selected="${this.pants.toString()}"
                  @selected="${(e) => this.handlePropertyChange('pants', parseInt(e.detail.selected))}"
                >
                  ${[...Array(10)].map((_, i) => html`
                    <wired-item value="${i}">Style ${i}</wired-item>
                  `)}
                </wired-combo>
              </div>

              <div class="control-group">
                <label class="control-label">Shirt (0-9)</label>
                <wired-combo
                  .selected="${this.shirt.toString()}"
                  @selected="${(e) => this.handlePropertyChange('shirt', parseInt(e.detail.selected))}"
                >
                  ${[...Array(10)].map((_, i) => html`
                    <wired-item value="${i}">Style ${i}</wired-item>
                  `)}
                </wired-combo>
              </div>

              <div class="control-group">
                <label class="control-label">Skin Color (0-9)</label>
                <wired-combo
                  .selected="${this.skin.toString()}"
                  @selected="${(e) => this.handlePropertyChange('skin', parseInt(e.detail.selected))}"
                >
                  ${[...Array(10)].map((_, i) => html`
                    <wired-item value="${i}">Color ${i}</wired-item>
                  `)}
                </wired-combo>
              </div>

              <div class="control-group">
                <label class="control-label">Hat Style</label>
                <wired-combo
                  .selected="${this.hat}"
                  @selected="${(e) => this.handlePropertyChange('hat', e.detail.selected)}"
                >
                  ${["none", "bunny", "coffee", "construction", "cowboy", 
                    "education", "knight", "ninja", "party", "pirate", "watermelon", "random"].map(hat => html`
                    <wired-item value="${hat}">${hat.charAt(0).toUpperCase() + hat.slice(1)}</wired-item>
                  `)}
                </wired-combo>

                <label class="control-label">Hat Color (0-9)</label>
                <wired-combo
                  .selected="${this.hatColor.toString()}"
                  @selected="${(e) => this.handlePropertyChange('hatColor', parseInt(e.detail.selected))}"
                >
                  ${[...Array(10)].map((_, i) => html`
                    <wired-item value="${i}">Color ${i}</wired-item>
                  `)}
                </wired-combo>
              </div>

              <div class="control-group">
                <div class="checkbox-group">
                  <wired-checkbox
                    ?checked="${this.fire}"
                    @change="${(e) => this.handlePropertyChange('fire', e.target.checked)}"
                  >Fire Effect</wired-checkbox>
                  
                  <wired-checkbox
                    ?checked="${this.walking}"
                    @change="${(e) => this.handlePropertyChange('walking', e.target.checked)}"
                  >Walking Animation</wired-checkbox>

                  <wired-checkbox
                    ?checked="${this.circle}"
                    @change="${(e) => this.handlePropertyChange('circle', e.target.checked)}"
                  >Circle Background</wired-checkbox>
                </div>
              </div>

              <div class="actions">
                <wired-button @click="${this.shareOnTwitter}">
                  Share on X
                </wired-button>
                <wired-button @click="${this.shareOnLinkedIn}">
                  Share on LinkedIn
                </wired-button>
                <wired-button @click="${this.reset}">
                  Reset Character
                </wired-button>
              </div>
            </wired-card>
          </section>
        </div>
      </div>
    `;
  }
}

customElements.define(RpgMeNew.tag, RpgMeNew);