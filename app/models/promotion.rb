class Promotion < ApplicationRecord
  has_and_belongs_to_many :products, join_table: 'promotions_products'
end
