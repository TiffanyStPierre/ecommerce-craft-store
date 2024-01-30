class Api::OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy]

  def index
    @orders = Order.all.includes(:customer, :products)
    render json: @orders, include: [:customer, :products]
  end

  def show
    # already set by the before_action
    render json: @order, include: [:customer, :products]
  end

  private

  def set_order
    @order = Order.find(params[:id])
  end
end
