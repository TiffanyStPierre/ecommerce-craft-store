class Api::ProductsController < ApplicationController

  before_action :set_product, only: [:show, :edit, :update, :destroy]

  def index
    @products = Product.all.includes(:categories, :promotions)
    render json: @products, include: [:categories, :promotions]
  end

  def search
    query = "%#{params[:q]}%"
    @products = Product
      .joins(:categories)
      .where("products.name ILIKE ? OR categories.name ILIKE ?", query, query)
      .distinct
    render json: @products, include: [:categories, :promotions]
  end

  def show
    # already set by the before_action
    render json: @product, include: [:categories, :promotions]
  end

  def create
    puts "Received params: #{params.inspect}"
    product = Product.new(product_params)
  
    # Find or create the category by name
    category_name = params[:category]
    puts "Category Name: #{category_name}" # Add this line for debugging
    category = Category.find_by(name: category_name)
  
    product.categories << category
  
    if product.save
      render json: product, include: [:categories, :promotions], status: :created
    else
      render json: { error: product.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :category, :inventory, :image_url, :thumbnail_url)
  end

end
