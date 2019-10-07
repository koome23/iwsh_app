Template.publicHeader.helpers
  activeIfTemplateIs: (template) ->
    'active' if Router.current().route.getName().startsWith(template)

Template.publicHeader.events
  'click [data-action=home]': (evt) ->
    Router.go 'home'
