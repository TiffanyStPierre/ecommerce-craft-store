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

  def create
    # Find or create the customer based on first name and last name
    order_data = params.require(:order)
    customer_params = order_data.require(:customer).permit(:first_name, :last_name, :email, :street_address, :city, :province, :postal_code)
    
    customer = Customer.find_or_create_by(first_name: customer_params[:first_name], last_name: customer_params[:last_name]) do |c|
      c.assign_attributes(customer_params)
    end
  
    # Build the order and associate it with the customer
    order = Order.new(
      customer: customer,
      order_date: Date.today,
      shipped_date: nil,
      subtotal_amount: order_data[:subtotal_amount],
      tax_amount: order_data[:tax_amount],
      total_amount: order_data[:total_amount]
    )
    
    # Associate products with the order
    cart_items = order_data[:cartItems]
    cart_items.each do |cart_item|
      product = Product.find(cart_item[:id])
      
      # Find or initialize the association between the order and the product
      order_product = order.orders_products.find_or_initialize_by(product_id: product.id)
      order_product.product_quantity = cart_item[:quantity]
      order_product.save
    end
    
    if order.save
      render json: order, include: [:customer, :products], status: :created
    else
      render json: { error: order.errors.full_messages.join(', ') }, status: :unprocessable_entity
    end
  end
  

  private

  def set_order
    @order = Order.find(params[:id])
  end

  def order_params
    params.require(:order).permit(
      customer: [:first_name, :last_name, :email, :street_address, :city, :province, :postal_code],
      cartItems: [:id, :quantity]
    )
  end
end
