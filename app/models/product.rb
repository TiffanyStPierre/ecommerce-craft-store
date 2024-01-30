class Product < ApplicationRecord
  has_and_belongs_to_many :categories, join_table: 'products_categories'
  has_and_belongs_to_many :promotions, join_table: 'promotions_products'
end
