class Order < ApplicationRecord
  belongs_to :customer
  has_and_belongs_to_many :products , join_table: 'orders_products'
end
