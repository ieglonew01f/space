Rails.application.routes.draw do
  root 'feed#index'
  
  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' }
  devise_scope :user do
    get '/users/sign_out', to: 'devise/sessions#destroy', as: :sign_out
  end

  mount ActionCable.server => '/cable'

  resources :posts

  resources :posts do
    collection do
      post 'parse_link'
    end
    resources :likes
  end

  resources :users do
    collection do
      patch 'update'
    end
  end
end
