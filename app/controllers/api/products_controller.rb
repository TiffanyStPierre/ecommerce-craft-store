class Api::ProductsController < ApplicationController

  before_action :set_product, only: [:show, :edit, :update, :destroy]

  def index
    @products = Product.all
    render json: @products
  end

  def show
    # already set by the before_action
    render json: @product
  end

  private

  def set_product
    @product = Product.find(params[:id])
  end

end
