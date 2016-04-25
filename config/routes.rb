Rails.application.routes.draw do
  devise_for :workers, controllers: { sessions: 'sessions', registrations: 'registrations' }
  devise_for :contractors, controllers: { sessions: 'sessions', registrations: 'registrations' }

  root 'home#index'

  namespace :api do
    namespace :v1 do
      resources :signup
      resources :dashboard
      resources :navrouter, only: [:show]
      post '/navrouter' => 'navrouter#index'
      get '/signup-job/:id' => 'signup#job'
      get '/resign-job/:id' => 'signup#resign'
    end
  end
end
