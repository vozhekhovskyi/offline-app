import React, { useCallback } from 'react';

import { withStore } from '../../components/Store';
import logo from '../../logo.svg';
import './MainPage.css';
import { PAGES } from '../../constants';

class Text extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<div>custom element</div>`
  }
}

window.customElements.define('x-text', Text);

const _MainPage = ({ state }) => {
  const handleNextClick = useCallback(() => {
    state.update({ page: PAGES.MAP });
  }, [state])
  return (
    <div className="MainPage-root">
      {/* <x-text></x-text> */}
      <header className="MainPage-header">
        <img
          src={logo}
          className="MainPage-logo"
          alt="logo"
          onClick={handleNextClick}
        />
        <p>
          ! Edit <code>src/App.js</code> and save to reload.
        </p>
      </header>
    </div>
  )
}

export const MainPage = withStore(_MainPage);
