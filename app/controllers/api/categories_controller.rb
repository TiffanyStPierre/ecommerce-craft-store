class Api::CategoriesController < ApplicationController

  def show

    @category = Category.find_by!(name: params[:name])
    if @category.present?
      @products = @category.products
      render json: { category: @category, products: @products }
    else
      render json: { error: 'Category not found' }, status: :not_found
    end
  end

end
