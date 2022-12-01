class CustomProgressBar extends HTMLElement {
  constructor() {
      super();
      const shadowRoot = this.attachShadow({mode: 'open'});
      shadowRoot.innerHTML = `
          <style>
              :host { 
                display: inline-block; 
                width: 5rem; 
                height: 1rem; 
              }
              .progress { 
                display: inline-block; 
                position: relative; 
                border: solid 1px #000; 
                padding: 1px; 
                width: 100%; 
                height: 100%; 
              }
              .progress > .bar { 
                background: #9cf; 
                height: 100%;
              }
              .progress > .label { 
                position: absolute; 
                top: 0; 
                left: 0; 
                width: 100%;
                text-align: center; 
                font-size: 0.8rem; 
                line-height: 1.1rem; 
              }
          </style>
          <div class="progress" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
              <div class="bar" style="width: 0px;"></div>
              <div class="label">0%</div>
          </div>
      `;
      this._progressElement = shadowRoot.querySelector('.progress');
      this._label = shadowRoot.querySelector('.label');
      this._bar = shadowRoot.querySelector('.bar');
  }

  static get observedAttributes() { return ['value']; }
  attributeChangedCallback(name, oldValue, newValue, namespaceURI) {
      if (name === 'value') {
          const newPercentage = newValue === null ? 0 : parseInt(newValue);
          this._progressElement.setAttribute('aria-valuenow', newPercentage);
          this._label.textContent = newPercentage + '%';
          this._bar.style.width = newPercentage + '%';
      }
  }
  
  get progress() { return this.getAttribute('value'); }
  set progress(newValue) { this.setAttribute('value', newValue); }
};


customElements.define('custom-progress-bar', CustomProgressBar);