Rails.application.routes.draw do
	get "api/test", to: "static#home"
	post "transaction", to: "transaction#add"
	get "transaction", to: "transaction#getAll"
	post "search", to: "currencies#search"
	post "calculate", to: "currencies#calculate"
	resources :sessions, only: [:create]
	resources :registrations, only: [:create]
	delete :logout, to: "sessions#logout"
	get :logged_in, to: "sessions#logged_in"
	root "currencies#index"
	get '*path', to: 'currencies#index'
end
