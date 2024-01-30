class Api::OrdersController < ApplicationController
  before_action :set_order, only: [:show, :edit, :update, :destroy]

  def index
    @orders = Order.all.includes(:customer, :products)
    render json: @orders, include: [:customer, :products]
  end

  def show
    render json: {
      order: @order,
      customer: @order.customer,
      products_with_quantity: @order.products_with_quantity.map { |pq| { product: pq[:product].as_json, product_quantity: pq[:product_quantity] } }
    }
  end

  private

  def set_order
    @order = Order.find(params[:id])
  end
end
