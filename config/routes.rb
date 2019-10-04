Rails.application.routes.draw do
	root "currencies#index"
	get "api/test", to: "static#home"
	post "search", to: "currencies#search"
	post "calculate", to: "currencies#calculate"
 end
