class Api::PromotionsController < ApplicationController

  def index
    @promotions = Promotion.all.includes(:products).order(created_at: :desc)
    render json: @promotions, include: [:products]
  end

  def create
    promotion = Promotion.new(promotion_params)
  
    params[:products].each do |product_id|
      product = Product.find(product_id)
      promotion.products << product
    end
  
    if promotion.save
      render json: promotion, include: [:products,], status: :created
    else
      render json: { error: promotion.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end

  private

  def set_promotion
    @promotion = Promotion.find(params[:id])
  end

  def promotion_params
    params.require(:promotion).permit(:name, :percent_discount, :start_date, :end_date, products: [])
  end

end
