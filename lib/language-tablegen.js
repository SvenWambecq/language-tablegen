'use babel';

import LanguageTablegenView from './language-tablegen-view';
import { CompositeDisposable } from 'atom';

export default {

  languageTablegenView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageTablegenView = new LanguageTablegenView(state.languageTablegenViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageTablegenView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-tablegen:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageTablegenView.destroy();
  },

  serialize() {
    return {
      languageTablegenViewState: this.languageTablegenView.serialize()
    };
  },

  toggle() {
    console.log('LanguageTablegen was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
