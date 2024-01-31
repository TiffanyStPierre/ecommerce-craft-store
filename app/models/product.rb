class Product < ApplicationRecord
  has_and_belongs_to_many :categories, join_table: 'products_categories'
  has_and_belongs_to_many :promotions, join_table: 'promotions_products'

  validates :name, presence: true
  validates :description, presence: true
  validates :price, presence: true
  validates :inventory, presence: true
  validates :image_url, presence: true
  validates :thumbnail_url, presence: true

end
