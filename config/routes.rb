Rails.application.routes.draw do
  resources :events, only: [:index, :create, :update, :destroy]
  get 'events/:date' => 'events#index'

  mount RailsAdmin::Engine => '/super_admin', as: 'rails_admin'
  root 'home#index'
  
  devise_for :users, controllers: { omniauth_callbacks: 'omniauth_callbacks' }
  devise_scope :user do
    get '/users/sign_out', to: 'devise/sessions#destroy', as: :sign_out
  end

  mount ActionCable.server => '/cable'
end
