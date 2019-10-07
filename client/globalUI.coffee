class @GlobalUI

Template.globalLayout.helpers

Template.globalLayout.events
  "click [data-action=sign-in]": (evt) ->
    Router.go "accounts.signIn"

  "click [data-action=sign-up]": (evt) ->
    Router.go "accounts.signUp"

  "click [data-action=about]": (evt) ->
    Router.go "about"
