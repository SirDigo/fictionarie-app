Rails.application.routes.draw do
  resources :comments, except: [:update]
  resources :posts
  resources :promts, only: [:index, :show, :create]
  resources :users, only: [:update, :show, :index]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  post '/signup', to: 'users#create'
  get  '/me', to: 'users#show_me'

end
