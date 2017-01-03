LanguageTablegenView = require './language-tablegen-view'
{CompositeDisposable} = require 'atom'

module.exports = LanguageTablegen =
  languageTablegenView: null
  modalPanel: null
  subscriptions: null

  activate: (state) ->
    @languageTablegenView = new LanguageTablegenView(state.languageTablegenViewState)
    @modalPanel = atom.workspace.addModalPanel(item: @languageTablegenView.getElement(), visible: false)

    # Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    @subscriptions = new CompositeDisposable

    # Register command that toggles this view
    @subscriptions.add atom.commands.add 'atom-workspace', 'language-tablegen:toggle': => @toggle()

  deactivate: ->
    @modalPanel.destroy()
    @subscriptions.dispose()
    @languageTablegenView.destroy()

  serialize: ->
    languageTablegenViewState: @languageTablegenView.serialize()

  toggle: ->
    console.log 'LanguageTablegen was toggled!'

    if @modalPanel.isVisible()
      @modalPanel.hide()
    else
      @modalPanel.show()
