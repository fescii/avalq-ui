export default class AppPost extends HTMLElement {
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
    // Change style to flex
    this.style.display='flex';

    // mql query at: 660px
    const mql = window.matchMedia('(max-width: 660px)');

    this.watchMediaQuery(mql);

    // scroll the window to the top and set height to 100vh
    window.scrollTo(0, 0);
  }

  // watch for mql changes
  watchMediaQuery = mql => {
    mql.addEventListener('change', () => {

      this.render();
    });
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

  getTemplate = () => {
    // Show HTML Here
    return `
      <div class="container">
        ${this.getBody()}
      </div>
      ${this.getStyles()}
    `;
  }

  getBody = () => {
    // Get story type
    const story = this.getAttribute('story');

    const mql = window.matchMedia('(max-width: 660px)');
    if (mql.matches) {
      return /* html */`
        ${this.getTop()}
        ${this.getPost(story)}
        ${this.getAuthor()}
        ${this.getSection()}
      `;
    }
    else {
      return /* html */`
        <div class="feeds">
          ${this.getTop()}
          ${this.getPost(story)}
          ${this.getSection()}
        </div>
        <div class="side">
          ${this.getAuthor()}
          <topics-container url="/topics/popular"></topics-container>
          ${this.getInfo()}
        </div>
      `;
    }
  }

  getPost = story => {
    switch (story) {
      case 'poll':
        return /*html */`
          <poll-wrapper upvotes="${this.getAttribute('upvotes')}" hash="${this.getAttribute('hash')}"
            replies="${this.getAttribute('replies')}" liked="${this.getAttribute('liked')}" likes="${this.getAttribute('likes')}"
            views="${this.getAttribute('views')}" time="${this.getAttribute('time')}"
            author-username="${this.getAttribute('author-username')}"
            options='${this.getAttribute("options")}' voted="${this.getAttribute('voted')}" selected="${this.getAttribute('selected')}"
            end-time="${this.getAttribute('end-time')}">
            ${this.innerHTML}
          </poll-wrapper>
        `
      default:
        return /* html */`
          <post-wrapper upvotes="${this.getAttribute('upvotes')}" id="${this.getAttribute('id')}"
            replies="${this.getAttribute('replies')}" liked="${this.getAttribute('liked')}" likes="${this.getAttribute('likes')}"
            views="${this.getAttribute('views')}" time="${this.getAttribute('time')}"
            author-username="${this.getAttribute('author-username')}">
            ${this.innerHTML}
          </post-wrapper>
        `
    }
  }

  getSection = () => {
    return /* html */`
      <post-section  url="${this.getAttribute('url')}" active="${this.getAttribute('tab')}" section-title="Post" username="${this.getAttribute('author-username')}"
        replies-url="${this.getAttribute('replies-url')}" likes-url="${this.getAttribute('likes-url')}">
      </post-section>
    `
  }

  getTop = () => {
    return /* html */ `
      <header-wrapper section="Post" type="post"
        user-url="${this.getAttribute('user-url')}" auth-url="${this.getAttribute('auth-url')}"
        url="${this.getAttribute('story-url')}" search-url="${this.getAttribute('search-url')}">
      </header-wrapper>
    `
  }

  getAuthor = () => {
    return /* html */`
			<author-wrapper username="${this.getAttribute('author-username')}" picture="${this.getAttribute('author-img')}" name="${this.getAttribute('author-name')}"
       followers="${this.getAttribute('author-followers')}" following="${this.getAttribute('author-following')}" user-follow="${this.getAttribute('author-follow')}"
       verified="${this.getAttribute('author-verified')}" url="/u/${this.getAttribute('author-username').toLowerCase()}"
      >
       ${this.getAttribute('author-bio')}
      </author-wrapper>
		`
  }

  getInfo = () => {
    return /*html*/`
      <info-container docs="/about/docs" new="/about/new"
       feedback="/about/feedback" request="/about/request" code="/about/code" donate="/about/donate" contact="/about/contact" company="https://github.com/aduki-hub">
      </info-container>
    `
  }

  getStyles() {
    return /*css*/`
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
	        width: 3px;
	      }

	      *::-webkit-scrollbar-track {
	        background: var(--scroll-bar-background);
	      }

	      *::-webkit-scrollbar-thumb {
	        width: 3px;
	        background: var(--scroll-bar-linear);
	        border-radius: 50px;
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
          padding: 0;
          margin: 0;
          display: flex;
          flex-flow: column;
          gap: 0;
        }

        .container {
          display: flex;
          justify-content: space-between;
          gap: 30px;
          /* use viewport device height */
          min-height: 100dvh;
        }

        .feeds {
          display: flex;
          flex-flow: column;
          gap: 0;
          width: 63%;
        }

        div.side {
          padding: 25px 0;
          width: 33%;
          display: flex;
          flex-flow: column;
          gap: 20px;
          position: sticky;
          top: 0;
          height: 100vh;
          max-height: 100vh;
          overflow-y: scroll;
          scrollbar-width: none;
        }

        div.side::-webkit-scrollbar {
          visibility: hidden;
          display: none;
        }

				@media screen and (max-width:660px) {
					:host {
            font-size: 16px;
					}

          .container {
            padding: 0;
            margin: 0;
            display: flex;
            flex-flow: column;
            justify-content: flex-start;
            gap: 0;
          }

					::-webkit-scrollbar {
						-webkit-appearance: none;
					}
					a {
						cursor: default !important;
          }

          .feeds {
            display: flex;
            flex-flow: column;
            gap: 0;
            width: 100%;
          }

          div.side {
            padding: 0;
            width: 100%;
          }
				}
	    </style>
    `;
  }
}