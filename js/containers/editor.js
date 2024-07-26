import { ClassicEditor, AccessibilityHelp, Autoformat,
	AutoLink, Autosave, Bold, Essentials, Heading,
	Italic, Link, List, Paragraph, SelectAll, Table, TableCaption, TableCellProperties,
	TableColumnResize, TableProperties, TableToolbar,
	TextTransformation, TodoList, Underline, Undo 
} from '/ckeditor5/ckeditor5.js';
const editorConfig = {
	height: '450px',
  width: '100%',
	toolbar: {
		items: [
			'heading',
			'|',
			'bold',
			'italic',
			'underline',
			'|',
			'link',
			'bulletedList',
			'numberedList',
		],
		shouldNotGroupWhenFull: false
	},
	toolbarLocation: 'bottom',
	plugins: [
		AccessibilityHelp,
		Autoformat,
		AutoLink,
		Autosave,
		Bold,
		Essentials,
		Heading,
		Italic,
		Link,
		List,
		Paragraph,
		SelectAll,
		Table,
		TableCaption,
		TableCellProperties,
		TableColumnResize,
		TableProperties,
		TableToolbar,
		TextTransformation,
		TodoList,
		Underline,
	],
	heading: {
		options: [
			{
				model: 'paragraph',
				title: 'Paragraph',
				class: 'ck-heading_paragraph'
			},
			{
				model: 'heading2',
				view: 'h2',
				title: 'Heading 2',
				class: 'ck-heading_heading2'
			},
			{
				model: 'heading3',
				view: 'h3',
				title: 'Heading 3',
				class: 'ck-heading_heading3'
			},
			{
				model: 'heading4',
				view: 'h4',
				title: 'Heading 4',
				class: 'ck-heading_heading4'
			}
		]
	},
	initialData:
		'<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n    You\'ve successfully created a CKEditor 5 project. This powerful text editor will enhance your application, enabling rich text editing\n    capabilities that are customizable and easy to use.\n</p>\n<h3>What\'s next?</h3>\n<ol>\n    <li>\n        <strong>Integrate into your app</strong>: time to bring the editing into your application. Take the code you created and add to your\n        application.\n    </li>\n    <li>\n        <strong>Explore features:</strong> Experiment with different plugins and toolbar options to discover what works best for your needs.\n    </li>\n    <li>\n        <strong>Customize your editor:</strong> Tailor the editor\'s configuration to match your application\'s style and requirements. Or even\n        write your plugin!\n    </li>\n</ol>\n<p>\n    Keep experimenting, and don\'t hesitate to push the boundaries of what you can achieve with CKEditor 5. Your feedback is invaluable to us\n    as we strive to improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<ul>\n    <li>📝 <a href="https://orders.ckeditor.com/trial/premium-features">Trial sign up</a>,</li>\n    <li>📕 <a href="https://ckeditor.com/docs/ckeditor5/latest/installation/index.html">Documentation</a>,</li>\n    <li>⭐️ <a href="https://github.com/ckeditor/ckeditor5">GitHub</a> (star us if you can!),</li>\n    <li>🏠 <a href="https://ckeditor.com">CKEditor Homepage</a>,</li>\n    <li>🧑‍💻 <a href="https://ckeditor.com/ckeditor-5/demo/">CKEditor 5 Demos</a>,</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n    See this text, but the editor is not starting up? Check the browser\'s console for clues and guidance. It may be related to an incorrect\n    license key if you use premium features or another feature-related requirement. If you cannot make it work, file a GitHub issue, and we\n    will help as soon as possible!\n</p>\n',
	link: {
		addTargetToExternalLinks: true,
		defaultProtocol: 'https://',
		decorators: {
			toggleDownloadable: {
				mode: 'manual',
				label: 'Downloadable',
				attributes: {
					download: 'file'
				}
			}
		}
	},
	placeholder: 'Type or paste your content here!',
	table: {
		contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
	}
};
export default class TextEditor extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.initEditor();
  }

  render() {
    this.shadowRoot.innerHTML = this.getTemplate();
  }

	getTemplate = () => {
		return /*html*/`
			${this.getHeader()}
			<div id="editor"></div>
			${this.getStyles()}
		`;
	}

	getHeader = () => {
    return /* html */`
      <div class="top">
        <p class="desc">
					Once you are done, click on the save button.
        </p>
				<input type="text" class="title" placeholder="Section title - (optional) -" value="${this.getAttribute('title') || ''}">
      </div>
    `;
  }

  initEditor() {
    this.editor = ClassicEditor.create(this.shadowRoot.getElementById('editor'), editorConfig)
  }

	getStyles = () => {
		return /*css*/`
		<link rel="stylesheet" href="/ckeditor5/ckeditor5.css">
		<style>
			::-webkit-scrollbar {
				width: 3px;
			}

			:host {
				display: block;
				width: 100%;
				min-height: calc(100dvh - 70px);
				height: max-content;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
			}

			.top {
				display: flex;
				flex-flow: column;
				gap: 5px;
				padding: 0 0 20px;
				width: 100%;
			}

			.top > h4.title {
				border-bottom: var(--border-mobile);
				display: flex;
				align-items: center;
				color: var(--editor-color);
				font-size: 1.3rem;
				font-weight: 500;
				margin: 0;
				padding: 0 0 6px 0;
			}

			.top > .desc {
				margin: 0;
				padding: 10px 0;
				color: var(--editor-color);
				font-size: 1rem;
				font-family: var(--font-main), sans-serif;
			}

			.top > input {
				border: var(--input-border);
				background-color: var(--background) !important;
				font-size: 1.3rem;
				font-weight: 500;
				width: 95%;
				height: max-content;
				outline: none;
				padding: 10px 12px;
				border-radius: 12px;
				color: var(--editor-color);
			}
			
			.top > input:-webkit-autofill,
			.top > input:-webkit-autofill:hover, 
			.top > input:-webkit-autofill:focus {
				-webkit-box-shadow: 0 0 0px 1000px var(--background) inset;
				-webkit-text-fill-color: var(--text-color) !important;
				transition: background-color 5000s ease-in-out 0s;
				color: var(--text-color) !important;
			}
			
			.top > input:autofill {
				filter: none;
				color: var(--text-color) !important;
			}

			.top > input:focus {
				border: var(--input-border-focus);
			}

			#editor {
				height: 450px;
				overflow-y: auto;
				height: calc(100% - 70px);
			}
			.ck.ck-editor__main > .ck-editor__editable {
				color: var(--editor-color);
			}
			.ck.ck-editor__main > .ck-editor__editable a {
				color: var(--anchor-color);
			}
			.ck-editor__editable_inline:not(.ck-comment__input *) {
				height: 420px;
				overflow-y: auto;
			}
			.ck-body-wrapper {
				display: none
				opacity: 0
				visibility: hidden
			}
			.ck.ck-reset.ck-editor {
				display: -webkit-box;
				display: -moz-box;
				display: -ms-flexbox;
				display: -webkit-flex;
				display: flex;
				-webkit-flex-direction: column;
				-moz-flex-direction: column;
				-ms-flex-direction: column;
				flex-direction: column;
			}
			.ck-focused, .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
				border: none;
				border: none;
				outline: none !important;
				-moz-outline: none !important;
				-webkit-outline: none !important;
				-ms-outline: none !important;
				-webkit-box-shadow: none;
				-moz-box-shadow: none;
				box-shadow: none
			}
		</style>`;
	}
}