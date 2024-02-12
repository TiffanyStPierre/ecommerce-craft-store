class Api::CategoriesController < ApplicationController

  def index
    @categories = Category.all
    render json: @categories
  end

  def show
    @category = Category.find_by!(name: params[:id])
    if @category.present?
      @products = @category.products.includes(:promotions)
      products_with_sale_info = @products.map do |product|
        product.as_json(include: { promotions: { only: [:name, :percent_discount] } }).merge(
          sale_price_info: product.sale_price_info
        )
      end
      render json: products_with_sale_info
    else
      render json: { error: 'Category not found' }, status: :not_found
    end
  end

end
