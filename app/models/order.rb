class Order < ApplicationRecord
  belongs_to :customer
  has_many :orders_products
  has_many :products, through: :orders_products

  def products_with_quantity
    orders_products.map do |order_product|
      product = order_product.product

      {
        product: product,
        product_quantity: order_product.product_quantity
      }
    end
  end
end

