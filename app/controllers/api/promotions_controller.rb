class Api::PromotionsController < ApplicationController

  def index
    @promotions = Promotion.all.includes(:products).order(created_at: :desc)
    render json: @promotions, include: [:products]
  end

end
