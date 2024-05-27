export default class QuePost extends HTMLElement {
  constructor() {
    // We are not even going to touch this.
    super();

    // let's create our shadow root
    this.shadowObj = this.attachShadow({ mode: "open" });

    this.render();
  }

  render() {
    this.shadowObj.innerHTML = this.getTemplate();
  }

  connectedCallback() {
    // console.log('We are inside connectedCallback');

    this.openShare();
  }

  disableScroll() {
    // Get the current page scroll position
    let scrollTop = window.scrollY || document.documentElement.scrollTop;
    let scrollLeft = window.scrollX || document.documentElement.scrollLeft;
    document.body.classList.add("stop-scrolling");

    // if any scroll is attempted, set this to the previous value
    window.onscroll = function () {
      window.scrollTo(scrollLeft, scrollTop);
    };
  }

  enableScroll() {
    document.body.classList.remove("stop-scrolling");
    window.onscroll = function () { };
  }

  openShare = () => {
    // Get share button
    const shareButton = this.shadowObj.querySelector('.action.share');

    // Check if the overlay exists
    if (shareButton) {
      // Get overlay
      const overlay = shareButton.querySelector('.overlay');

      // Select close button
      const closeButton = shareButton.querySelector('.close');

      // Add event listener to the close button
      closeButton.addEventListener('click', e => {
        // prevent the default action
        e.preventDefault()

        // prevent the propagation of the event
        e.stopPropagation();

        // Remove the active class
        overlay.classList.remove('active');
      });

      // Add event listener to the share button
      shareButton.addEventListener('click', e => {
        // prevent the default action
        e.preventDefault()

        // prevent the propagation of the event
        e.stopPropagation();

        // Toggle the overlay
        overlay.classList.add('active');

        // add event to run once when the overlay is active: when user click outside the overlay
        document.addEventListener('click', e => {
          e.preventDefault();
          e.stopPropagation();

          // Check if the target is not the overlay
          if (!overlay.contains(e.target)) {

            // Remove the active class
            overlay.classList.remove('active');
          }
        }, { once: true });
      });
    }
  }

  formatNumber = n => {
    if (n >= 0 && n <= 999) {
      return n.toString();
    } else if (n >= 1000 && n <= 9999) {
      const value = (n / 1000).toFixed(2);
      return `${value}k`;
    } else if (n >= 10000 && n <= 99999) {
      const value = (n / 1000).toFixed(1);
      return `${value}k`;
    } else if (n >= 100000 && n <= 999999) {
      const value = (n / 1000).toFixed(0);
      return `${value}k`;
    } else if (n >= 1000000 && n <= 9999999) {
      const value = (n / 1000000).toFixed(2);
      return `${value}M`;
    } else if (n >= 10000000 && n <= 99999999) {
      const value = (n / 1000000).toFixed(1);
      return `${value}M`;
    } else if (n >= 100000000 && n <= 999999999) {
      const value = (n / 1000000).toFixed(0);
      return `${value}M`;
    } else {
      return "1B+";
    }
  }

  parseToNumber = num_str => {
    // Try parsing the string to an integer
    const num = parseInt(num_str);

    // Check if parsing was successful
    if (!isNaN(num)) {
      return num;
    } else {
      return 0;
    }
  }

  getTemplate() {
    // Show HTML Here
    return `
      ${this.getBody()}
      ${this.getActions()}
      ${this.getStyles()}
    `;
  }

  getActions = () => {
    return /*html*/`
      <div class="actions stats">
        <span class="play">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7.83241C12 6.70741 5.84844 3.10841 5.15062 3.75553C4.45414 4.40265 4.3857 11.2012 5.15062 11.9093C5.91688 12.6199 12 8.95741 12 7.83241Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="text">Play</span>
        </span>
        ${this.getLike(this.getAttribute('liked'))}
        ${this.getStat()}
        <span class="action share">
          <span class="icon">
            <span class="sp">•</span>
            <span class="sp">•</span>
          </span>
          ${this.getShare()}
        </span>
      </div>
    `
  }

  getLike = (liked) => {
    // Get total likes and parse to integer
    const likes = this.getAttribute('likes') || 0;
    const totalLikes = this.parseToNumber(likes);

    // Format the number
    const likesFormatted = this.formatNumber(totalLikes);

    if (liked === 'true') {
      return /*html*/`
        <span class="action like true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            <path d="M7.655 14.916v-.001h-.002l-.006-.003-.018-.01a22.066 22.066 0 0 1-3.744-2.584C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.044 5.231-3.886 6.818a22.094 22.094 0 0 1-3.433 2.414 7.152 7.152 0 0 1-.31.17l-.018.01-.008.004a.75.75 0 0 1-.69 0Z"></path>
          </svg>
          <span class="numbers">
            <span id="uab">${likesFormatted}</span>
          </span>
        </span>
			`
    }
    else {
      return /*html*/`
        <span class="action like">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            <path d="m8 14.25.345.666a.75.75 0 0 1-.69 0l-.008-.004-.018-.01a7.152 7.152 0 0 1-.31-.17 22.055 22.055 0 0 1-3.434-2.414C2.045 10.731 0 8.35 0 5.5 0 2.836 2.086 1 4.25 1 5.797 1 7.153 1.802 8 3.02 8.847 1.802 10.203 1 11.75 1 13.914 1 16 2.836 16 5.5c0 2.85-2.045 5.231-3.885 6.818a22.066 22.066 0 0 1-3.744 2.584l-.018.01-.006.003h-.002ZM4.25 2.5c-1.336 0-2.75 1.164-2.75 3 0 2.15 1.58 4.144 3.365 5.682A20.58 20.58 0 0 0 8 13.393a20.58 20.58 0 0 0 3.135-2.211C12.92 9.644 14.5 7.65 14.5 5.5c0-1.836-1.414-3-2.75-3-1.373 0-2.609.986-3.029 2.456a.749.749 0 0 1-1.442 0C6.859 3.486 5.623 2.5 4.25 2.5Z"></path>
          </svg>
          <span class="numbers">
            <span id="uab">${likesFormatted}</span>
          </span>
        </span>
			`
    }
  }

  getStat = () => {
    // Get current stats and last stats
    const currentStats = this.getAttribute('current-stats') || 0;
    const lastStats = this.getAttribute('last-stats') || 0;

    // Parse the values to integers
    const current = this.parseToNumber(currentStats);
    const last = this.parseToNumber(lastStats);

    // Get the absolute difference between the two
    const diff = Math.abs(current - last);

    // Format the number
    const diffFormatted = this.formatNumber(diff);


    if (current > last) {
      return /*html*/`
        <span class="stat trend up">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            <path d="M4.53 4.75A.75.75 0 0 1 5.28 4h6.01a.75.75 0 0 1 .75.75v6.01a.75.75 0 0 1-1.5 0v-4.2l-5.26 5.261a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L9.48 5.5h-4.2a.75.75 0 0 1-.75-.75Z"></path>
          </svg>
          <span class="numbers">
            <span id="uab">${diffFormatted}</span>
          </span>
        </span>
      `
    }
    else {
      return /*html*/`
        <span class="stat trend down">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
            <path d="M4.22 4.179a.75.75 0 0 1 1.06 0l5.26 5.26v-4.2a.75.75 0 0 1 1.5 0v6.01a.75.75 0 0 1-.75.75H5.28a.75.75 0 0 1 0-1.5h4.2L4.22 5.24a.75.75 0 0 1 0-1.06Z"></path>
          </svg>
          <span class="numbers">
            <span id="uab">${diffFormatted}</span>
          </span>
        </span>
      `
    }
  }

  getShare = () => {
    return /* html */`
      <div class="overlay">
        <span class="close"></span>
        <span class="options">
          <span class="option link">
            <span class="text">Copy link</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 640 512">
              <path d="M580.3 267.2c56.2-56.2 56.2-147.3 0-203.5C526.8 10.2 440.9 7.3 383.9 57.2l-6.1 5.4c-10 8.7-11 23.9-2.3 33.9s23.9 11 33.9 2.3l6.1-5.4c38-33.2 95.2-31.3 130.9 4.4c37.4 37.4 37.4 98.1 0 135.6L433.1 346.6c-37.4 37.4-98.2 37.4-135.6 0c-35.7-35.7-37.6-92.9-4.4-130.9l4.7-5.4c8.7-10 7.7-25.1-2.3-33.9s-25.1-7.7-33.9 2.3l-4.7 5.4c-49.8 57-46.9 142.9 6.6 196.4c56.2 56.2 147.3 56.2 203.5 0L580.3 267.2zM59.7 244.8C3.5 301 3.5 392.1 59.7 448.2c53.6 53.6 139.5 56.4 196.5 6.5l6.1-5.4c10-8.7 11-23.9 2.3-33.9s-23.9-11-33.9-2.3l-6.1 5.4c-38 33.2-95.2 31.3-130.9-4.4c-37.4-37.4-37.4-98.1 0-135.6L207 165.4c37.4-37.4 98.1-37.4 135.6 0c35.7 35.7 37.6 92.9 4.4 130.9l-5.4 6.1c-8.7 10-7.7 25.1 2.3 33.9s25.1 7.7 33.9-2.3l5.4-6.1c49.9-57 47-142.9-6.5-196.5c-56.2-56.2-147.3-56.2-203.5 0L59.7 244.8z" />
            </svg>
          </span>
          <span class="option frame">
            <span class="text">Share frame</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="M.527 9.237a1.75 1.75 0 0 1 0-2.474L6.777.512a1.75 1.75 0 0 1 2.475 0l6.251 6.25a1.75 1.75 0 0 1 0 2.475l-6.25 6.251a1.75 1.75 0 0 1-2.475 0L.527 9.238Zm1.06-1.414a.25.25 0 0 0 0 .354l6.251 6.25a.25.25 0 0 0 .354 0l6.25-6.25a.25.25 0 0 0 0-.354l-6.25-6.25a.25.25 0 0 0-.354 0l-6.25 6.25Z"></path>
            </svg>
          </span>
          <span class="option code">
            <span class="text">Embed code</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16" fill="currentColor">
              <path d="m11.28 3.22 4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L13.94 8l-3.72-3.72a.749.749 0 0 1 .326-1.275.749.749 0 0 1 .734.215Zm-6.56 0a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042L2.06 8l3.72 3.72a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215L.47 8.53a.75.75 0 0 1 0-1.06Z"></path>
            </svg>
          </span>
        </span>
      </div>
    `
  }

  getBody() {
    // Get inner HTML
    const content = this.innerHTML;

    // Get and shorten artist name to 20 characters
    const artist = this.getAttribute('artist');
    const artistShort = artist.length > 20 ? artist.substring(0, 20) + '...' : artist;

    // Get and shorten album name to 20 characters
    const album = this.getAttribute('album');
    const albumShort = album.length > 20 ? album.substring(0, 20) + '...' : album;

    return /* html */`
      <div class="body">
        <div class="lyrics">
          ${content}
        </div>
        <span class="title">${this.getAttribute('song')}</span>
        <div class="info">
          <span class="album">${albumShort}</span>
          <span class="sp">•</span>
          <span class="artist">${artistShort}</span>
          <span class="sp">•</span>
          <span class="date">${this.getAttribute('released')}</span>
        </div>
      </div>
    `;
  }

  getStyles() {
    return /* css */`
    <style>
      *,
      *:after,
      *:before {
        box-sizing: border-box !important;
        font-family: inherit;
        -webkit-box-sizing: border-box !important;
      }

      *:focus {
        outline: inherit !important;
      }

      *::-webkit-scrollbar {
        -webkit-appearance: none;
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6 {
        padding: 0;
        margin: 0;
        font-family: inherit;
      }

      p,
      ul,
      ol {
        padding: 0;
        margin: 0;
      }

      a {
        text-decoration: none;
      }


      :host {
        font-size: 16px;
        border-bottom: var(--story-border);
        width: 100%;
        display: flex;
        flex-flow: column;
        gap: 0;
        padding: 15px 0 10px;
      }

      .body {
        display: flex;
        flex-flow: column;
        gap: 0;
      }

      .body > .lyrics {
        display: flex;
        flex-flow: column;
        position: relative;
        gap: 5px;
        padding: 0;
        margin: 0 0 8px;
      }

      .body > .lyrics > p {
        display: block;
        color: var(--text-color);
        font-family: var(--font-main), sans-serif;
        line-height: 1.2;
        font-size: 1rem;
        font-weight: 400;
        margin: 0;
        padding: 0 10px 0 18px;
      }

      .body > .lyrics::before {
        content: '';
        display: inline-block;
        box-sizing: border-box;
        width: 3px;
        height: 90%;
        position: absolute;
        left: 2px;
        top: 5%;
        /* background-color: var(--action-color); */
        background: var(--alt-linear);
        opacity: .7;
        border-radius: 2px;
        -webkit-border-radius: 2px;
        -moz-border-radius: 2px;
        -ms-border-radius: 2px;
        -o-border-radius: 2px;
      }

      .body > .lyrics > p span.highlight {
        /* font-weight: 500; */
        padding: 0 5px;
        color: transparent;
        background: var(--accent-linear);
        background-clip: text;
        -webkit-background-clip: text;
      }

      .body > span.title {
        color: var(--action-color);
        font-family: var(--font-que), sans-serif;
        font-weight: 500;
        font-size: 1.07rem;
        line-height: 1;
      }

      .body > .info {
        /* border: 1px solid #6b7280; */
        color: var(--gray-color);
        display: flex;
        flex-flow: row;
        align-items: center;
        gap: 5px;
        font-weight: 500;
        font-family: var(--font-text), sans-serif;
        /* font-family: var(--font-que), sans-serif; */
        font-size: 0.8rem;
      }

      .body > .info .genre {
        text-transform: capitalize;
      }

      .body > .info .sp {
        height: max-content;
        line-height: 1;
        /* margin: 2px 0 0 0; */
      }

      .stats.actions {
        /* border: var(--input-border); */
        padding: 5px 0 0 0;
        margin: 0;
        display: flex;
        align-items: center;
        gap: 5px;
      }

      .stats.actions > span.play {
        cursor: pointer;
        display: flex;
        align-items: center;
        font-family: var(--font-text) sans-serif;
        font-size: 0.95rem;
        justify-content: start;
        gap: 2px;
        padding: 0 10px 0 8px;
        height: 30px;
        border-radius: 50px;
        font-weight: 500;
        font-size: 1rem;
        color: var(--gray-color);
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        -ms-border-radius: 50px;
        -o-border-radius: 50px;
      }
      .stats.actions > span.play > span.text {
        font-family: var(--font-text), sans-serif;
        font-size: 0.9rem;
        font-weight: 500;
        color: var(--gray-color);
      }

      .stats.actions > span.play > svg {
        color: inherit;
        width: 22px;
        height: 22px;
      }

      .stats.actions > span.stat,
      .stats.actions > span.action {
        /* border: var(--input-border); */
        min-height: 35px;
        height: 30px;
        width: max-content;
        position: relative;
        padding: 5px 10px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
        font-size: 1rem;
        font-weight: 400;
        /* color: var(--action-color); */
        color: var(--gray-color);
        border-radius: 50px;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
        -ms-border-radius: 50px;
        -o-border-radius: 50px;
      }

      .stats.actions > span:first-of-type {
        margin: 0 0 0 -10px;
      }

      .stats.actions > span.action.share {
        /* border: var(--input-border); */
        min-height: 35px;
        height: 35px;
        width: 35px;
        max-width: 35px;
        padding: 0;
      }

      .stats.actions > span.play:hover,
      .stats.actions > span.stat:hover,
      .stats.actions > span.action:hover {
        background: var(--hover-background);
      }

      .stats.actions span.numbers {
        /* border: var(--input-border); */
        font-family: var(--font-main), sans-serif;
        font-size: 1rem;
        font-weight: 500;
      }

      .stats.actions > span {
        /* border: var(--input-border); */
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3px;
        font-size: 1rem;
        font-weight: 400;
        /* color: var(--gray-color); */
      }

      .stats.actions > .stat > .numbers,
      .stats.actions > .action > .numbers {
        height: 21px;
        min-height: 21px;
        padding: 0;
        margin: 0;
        display: flex;
        overflow-y: scroll;
        display: flex;
        gap: 5px;
        align-items: start;
        justify-content: start;
        flex-flow: column;
        transition: transform 0.5s linear;
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .stats.actions > span > .numbers::-webkit-scrollbar {
        display: none !important;
        visibility: hidden;
      }

      .stats.actions > span > .numbers {
        transition: all 500ms ease-in-out;
        -webkit-transition: all 500ms ease-in-out;
        -moz-transition: all 500ms ease-in-out;
        -ms-transition: all 500ms ease-in-out;
        -o-transition: all 500ms ease-in-out;
      }

      .stats.actions > span > .numbers > span {
        /* border: 1px solid red; */
        line-height: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 21px;
        min-height: 21px;
        padding: 0;
        margin: 0;
        font-family: var(--font-main), sans-serif;
        font-size: 0.95rem;
      }

      .stats.actions > span.true > .numbers > span,
      .stats.actions > span.active > .numbers > span {
        color: transparent;
        background: var(--second-linear);
        background-clip: text;
        -webkit-background-clip: text;
      }

      .stats.actions > span.up > .numbers > span {
        color: transparent;
        background: var(--accent-linear);
        background-clip: text;
        -webkit-background-clip: text;
      }

      .stats.actions > span.down > .numbers > span {
        color: transparent;
        background: var(--error-linear);
        background-clip: text;
        -webkit-background-clip: text;
      }

      .stats.actions > span.action.share {
        min-width: 45px;
      }

      .stats.actions > span.action.share > .icon {
        display: flex;
        gap: 0;
      }
      .stats.actions > span.action.share > .icon > span.sp {
        display: inline-block;
        font-size: 1.2rem;
        margin: 0 0 2px 0;
        /* color: var(--gray-color); */
      }

      .stats.actions > span svg {
        color: inherit;
        width: 16px;
        height: 16px;
      }

      .stats.actions > span.action.like svg {
        margin: -1px 0 0 0;
        width: 16px;
        height: 16px;
      }

      .stats.actions > span.stat svg {
        width: 19px;
        height: 19px;
      }

      .stats.actions > span.stat.up svg {
        color: var(--accent-color);
      }

      .stats.actions > span.stat.down svg {
        color: var(--error-color);
      }

      .stats.actions > span.true svg,
      .stats.actions > span.active svg {
        color: var(--color-alt);
      }

      .stats.actions > span.action.share > .overlay {
        display: none;
        flex-flow: column;
        z-index: 4;
      }

      .stats.actions > span.action.share > .overlay span.close {
        display: none;
      }

      .stats.actions>span.action.share > .overlay.active {
        display: flex;
      }

      .stats.actions > span.action.share .options {
        display: flex;
        flex-flow: column;
        gap: 0;
        box-shadow: var(--card-box-shadow);
        width: 240px;
        padding: 8px 8px;
        position: absolute;
        bottom: calc(100% - 35px);
        right: calc(50% - 100px);
        background: var(--background);
        border: var(--story-border-mobile);
        border-radius: 20px;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        -ms-border-radius: 20px;
        -o-border-radius: 20px;
      }

      .stats.actions > span.action.share .options > .option {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        padding: 8px 10px;
        color: var(--text-color);
        border-radius: 8px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
        -ms-border-radius: 8px;
        -o-border-radius: 8px;
      }

      .stats.actions > span.action.share .options > .option:hover {
        background: var(--hover-background);
      }

      .stats.actions > span.action.share .options > .option > span.text {
        font-family: var(--font-text), sans-serif;
        font-weight: 500;
        font-size: 1.05rem;
      }

      .stats.actions > span.action.share .options > .option > svg {
        width: 18px;
        height: 18px;
      }

      .stats.actions > span.action.share .options > .option.code > svg,
      .stats.actions > span.action.share .options > .option.frame > svg {
        width: 17px;
        height: 17px;
      }

      @media screen and (max-width:660px) {
        :host {
        font-size: 16px;
          border-bottom: var(--story-border-mobile);
        }

        ::-webkit-scrollbar {
          -webkit-appearance: none;
        }

        a,
        span.stat,
        span.action {
          cursor: default !important;
        }

        .stats.actions > span.play:hover,
        .stats.actions > span.stat:hover,
        .stats.actions > span.action:hover {
          background: none;
        }

        .stats.actions > span.action.share > .overlay {
          position: fixed;
          background-color: var(--modal-overlay);
          z-index: 100;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          display: none;
        }

        .stats.actions > span.action.share > .overlay span.close {
          display: flex;
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          left: 0;
        }

        .stats.actions > span.action.share .options {
          display: flex;
          flex-flow: row;
          align-items: center;
          justify-content: space-around;
          z-index: 1;
          gap: 0;
          box-shadow: var(--card-box-shadow);
          width: 100%;
          padding: 15px 8px;
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          background: var(--background);
          border: var(--story-border-mobile);
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          border-top-left-radius: 10px;
          border-top-right-radius: 10px;
        }

        .stats.actions > span.action.share .options > .option {
          display: flex;
          flex-flow: column-reverse;
          align-items: center;
          justify-content: space-between;
          gap: 5px;
          padding: 10px;
        }

        .stats.actions > span.action.share .options > .option > svg {
          width: 30px;
          height: 30px;
        }

        .stats.actions > span.action.share .options > .option.code > svg,
        .stats.actions > span.action.share .options > .option.frame > svg {
          width: 29px;
          height: 29px;
        }

        .stats.actions > span.action.share .options > .option > span.text {
          font-family: var(--font-read), sans-serif;
          font-weight: 400;
          font-size: 0.8rem;
        }
      }
    </style>
    `;
  }
}