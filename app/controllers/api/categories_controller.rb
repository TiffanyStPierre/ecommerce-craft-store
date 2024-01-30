class Api::CategoriesController < ApplicationController

  def show
    puts "Received params: #{params.inspect}"
    @category = Category.find_by!(name: params[:id])
    if @category.present?
      @products = @category.products
      render json: @products
    else
      render json: { error: 'Category not found' }, status: :not_found
    end
  end

end
