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

  private

  def set_product
    @product = Product.find(params[:id])
  end

end
