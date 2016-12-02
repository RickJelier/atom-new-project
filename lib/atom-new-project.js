'use babel';

import AtomNewProjectView from './atom-new-project-view';
import { CompositeDisposable } from 'atom';

export default {

  atomNewProjectView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.atomNewProjectView = new AtomNewProjectView(state.atomNewProjectViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.atomNewProjectView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'atom-new-project:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.atomNewProjectView.destroy();
  },

  serialize() {
    return {
      atomNewProjectViewState: this.atomNewProjectView.serialize()
    };
  },

  toggle() {
    console.log('AtomNewProject was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
