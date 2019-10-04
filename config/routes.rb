Rails.application.routes.draw do
	root "currencies#index"
	get "api/test", to: "static#home"
	post "search", to: "currencies#search"
	post "calculate", to: "currencies#calculate"
	resources :sessions, only: [:create]
	resources :registrations, only: [:create]
	delete :logout, to: "sessions#logout"
	get :logged_in, to: "sessions#logged_in"
 end
