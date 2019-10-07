Meteor.startup ->
  Inject.rawModHtml 'addUnresolved', (html) ->
    html = html.replace '<body>', '<body fullbleed vertical layout unresolved>'
