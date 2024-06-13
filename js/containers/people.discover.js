export default class DiscoverPeople extends HTMLElement {
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
    const contentContainer = this.shadowObj.querySelector('.people-list');

    this.fetchPeople(contentContainer);
  }

  fetchPeople = (contentContainer) => {
    const peopleLoader = this.shadowObj.querySelector('authors-loader');
    const content = this.getPeople();
    setTimeout(() => {
      peopleLoader.remove();
      contentContainer.insertAdjacentHTML('beforeend', content);
    }, 2000)
  }

  getTemplate = () => {
    // Show HTML Here
    return `
      ${this.getBody()}
      ${this.getStyles()}
    `;
  }

  getLoader = () => {
    return `
			<authors-loader speed="300"></authors-loader>
		`
  }

  getBody = () => {
    // language=HTML
    return `
			<div class="people-list">
				${this.getLoader()}
			</div>
    `;
  }

  getPeople = () => {
    return /*html*/`
			<person-wrapper username="U0BC98H63AB1" name="John Doe" picture="/img/img.jpg" verified="true" user-follow="true"
				url="/u/U0BC98H63AB1" following="236" followers="9734" you="false"
				bio="I'm John Doe, a passionate software developer with a love for coding and problem-solving.">
			</person-wrapper>

			<person-wrapper username="U0BC98H63BCA" name="Janet Doe" picture="/img/img3.png" you="true"
				verified="false" user-follow="false" url="/u/U0BC98H63AB1" following="736" followers="5134"
				bio="Hi, I'm Janet Doe, a nature enthusiast and aspiring photographer.">
			</person-wrapper>

			<person-wrapper username="U0BC9BAC53H4" name="Yosemite Sam" picture="/img/img2.png" you="false"
				verified="true" user-follow="true" url="/u/U0BC98H63AB1" following="36" followers="234"
				bio="Yosemite Sam here! I'm a cowboy with a passion for adventure and the great outdoors.">
			</person-wrapper>

			<person-wrapper username="U0PHAB693NBA" name="Farghon Legon" picture="/img/img3.png" you="false"
				verified="false" user-follow="true" url="/u/U0BC98H63AB1" following="36" followers="9734"
				bio="Hey there, I'm Farghon Legon. I'm an artist by heart and a dreamer by soul.">
			</person-wrapper>

			<person-wrapper username="U0DAB69B79NH" name="Porky Pig" picture="/img/img4.png" you="false"
				verified="false" user-follow="false" url="/u/U0BC98H63AB1" following="6723" followers="79734"
				bio="Oink! I'm Porky Pig, always up for some fun and mischief.">
			</person-wrapper>

			<person-wrapper username="U0BCCA53HP1" name="Bugs Bunny" picture="/img/img5.png" you="false"
				verified="true" user-follow="false" url="/u/U0BC98H63AB1" following="836" followers="1034"
				bio="What's up, doc? I'm Bugs Bunny, the carrot-loving mischief-maker.">
			</person-wrapper>

			<person-wrapper username="U0PC98H63AB8" name="Marvin Martian" picture="/img/img.jpg" you="false"
				verified="false" user-follow="true" url="/u/U0BC98H63AB1" following="6" followers="934"
				bio="Greetings, earthlings! I'm Marvin Martian, on a mission to conquer the universe.">
			</person-wrapper>
		`
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
				  background-color: var(--background);
				  padding: 15px 0 0 0;
				  display: flex;
				  flex-flow: column;
				  gap: 5px;
          width: 100%;
          max-width: 100%;
				}

        .title {
					/* border: 1px solid red; */
				  padding: 0 0 10px 3px;
				  display: flex;
				  flex-flow: column;
				  gap: 0;
				}

				.title h4 {
				  color: #1f2937;
				  font-size: 1.3rem;
				  font-weight: 500;
					padding: 0;
					margin: 0;
				}

				.title > span {
				  color: var(--gray-color);
          font-family: var(--font-text);
				  font-size: 0.85rem;
				}

				.people-list {
					background-color: var(--background);
					padding: 0;
					display: flex;
					flex-flow: row;
					gap: 20px;
					width: 100%;
          max-width: 100%;
					overflow-x: scroll;
					-ms-overflow-style: none;
					scrollbar-width: none;
				}

				.people-list::-webkit-scrollbar {
					display: none !important;
					visibility: hidden;
					-webkit-appearance: none;
				}

				@media screen and (max-width:660px) {
					:host {
        font-size: 16px;
						padding: 15px 0;
						position: static;
					}

					a {
						cursor: default !important;
					}
				}
	    </style>
    `;
  }
}