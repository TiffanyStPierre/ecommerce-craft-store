Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  namespace :api do # /api/data
    resources :products
    get '/products', to: 'products#index'
    get '/product/:id', to: 'products#show'
    get '/search', to: 'products#search'
    get '/similar_products/:id', to: 'products#similar_products'
    post '/product/new', to: 'products#create'
    delete '/product/:id', to: 'products#destroy'
    put '/product/edit/:id', to: 'products#update'
    

    resources :categories
    get '/categories', to: 'categories#index'
    get '/categories/:id', to: 'categories#show'

    resources :orders
    get '/orders', to: 'orders#index'
    get '/order/:id', to: 'orders#show'
    post '/order/new', to: 'orders#create'
  end

  # Exclude paths starting with /api from the wildcard route
  get '*path', to: "static_pages#fallback_index_html", constraints: ->(request) { !(request.path =~ /^\/api/) }
end
