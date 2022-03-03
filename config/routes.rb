Rails.application.routes.draw do
  resources :comments, except: [:update]
  resources :posts
  resources :prompts, only: [:index, :create]
  resources :users, only: [:update, :show, :index]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get '/last_prompt', to: 'prompts#show' 
  get '/prompts/:day_title', to: 'prompts#render_prompt_by_date'

  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  post '/signup', to: 'users#create'
  get  '/me', to: 'users#show_me'

  get '/posts/:id/comments', to: 'comments#get_post_comments'
end
