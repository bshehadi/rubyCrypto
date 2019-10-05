if Rails.env === "production"
	Rails.application.config.session_store :cookie_store, key: "_auth_app", domain: "quiet-tor-17270.herokuapp.com"
else
	Rails.application.config.session_store :cookie_store, key: "_auth_app"
end