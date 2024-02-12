class Api::ProductsController < ApplicationController

  before_action :set_product, only: [:show, :edit, :update, :destroy]

  def index
    puts "Inside index action"
    @products = Product.all.includes(:categories, :promotions).order(created_at: :desc)
    products_with_sale_info = @products.map do |product|
      product.as_json(include: [:categories, promotions: { only: [:name, :percent_discount] }]).merge(
        sale_price_info: product.sale_price_info
      )
    end
    puts "Products with sale info: #{products_with_sale_info}"
    render json: products_with_sale_info
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
    @product = Product.includes(:categories, promotions: :products).find(params[:id])
    render json: @product, include: { categories: {}, promotions: { only: [:name, :percent_discount] } }, methods: :sale_price_info
  end

  def similar_products
    product = Product.find(params[:id])
    category_ids = product.category_ids
    similar_products = Product.joins(:categories).where(categories: { id: category_ids }).where.not(id: product.id).limit(3)
    render json: similar_products
  end

  def create
    product = Product.new(product_params)
  
    # Find the category by name
    category_name = params[:category]
    category = Category.find_by(name: category_name)
  
    product.categories << category
  
    if product.save
      render json: product, include: [:categories, :promotions], status: :created
    else
      render json: { error: product.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  def update
    category_name = params[:category]
    category = Category.find_by(name: category_name)

  if @product.update(product_params)
    # Clear existing categories and add the new one
    @product.categories.clear
    @product.categories << category

    render json: @product, include: [:categories, :promotions], status: :ok
  else
    render json: { error: @product.errors.full_messages.join(', ') }, status: :unprocessable_entity
  end
  end

  def destroy
    @product = Product.find(params[:id])
    @product.destroy
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

  def product_params
    params.require(:product).permit(:name, :description, :price, :category, :inventory, :image_url, :thumbnail_url)
  end

end
