class OrdersProduct < ApplicationRecord
  belongs_to :order
  belongs_to :product

  def product_quantity
    self[:product_quantity]
  end
end
