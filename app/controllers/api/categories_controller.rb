class Api::CategoriesController < ApplicationController

  def index
    @categories = Category.all
    render json: @categories
  end

  def show

    @category = Category.find_by!(name: params[:id])
    if @category.present?
      @products = @category.products
      render json: @products
    else
      render json: { error: 'Category not found' }, status: :not_found
    end
  end

end
