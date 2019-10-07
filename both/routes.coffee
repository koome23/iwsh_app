#
# Public Routes
#
@PublicController = RouteController.extend
  layoutTemplate: "publicLayout"

Router.route "/",
  name: "home"
  action: ->
    @layout "publicLayout"
    @render "home"

Router.route "/policies/cloud-access-rules",
  name: "policies|cloud-access-rules"
  action: ->
    @layout "publicLayout"
    @render "cloud-access-rules"

Router.configure
    progressSpinner: false
    progress: false
