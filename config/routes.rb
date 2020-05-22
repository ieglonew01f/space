Rails.application.routes.draw do
  root 'feed#index'
  
  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' }
  devise_scope :user do
    get '/users/sign_out', to: 'devise/sessions#destroy', as: :sign_out
  end

  resources :posts

  resources :posts do
    collection do
      post 'parse_link'
    end
    resources :likes
  end
end