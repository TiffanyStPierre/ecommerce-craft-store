class Product < ApplicationRecord
  has_and_belongs_to_many :categories, join_table: 'products_categories'
  has_and_belongs_to_many :promotions, join_table: 'promotions_products'

  def sale_price_info
    if promotions.any?
      active_promotions = promotions.select(&:active?)
      puts "Active Promotions for #{name}: #{active_promotions.map(&:name).join(', ')}" # Log active promotions
      if active_promotions.any?
        max_discount_promotion = active_promotions.max_by(&:percent_discount)
        discount_percentage = max_discount_promotion.percent_discount
        sale_price = price * (1 - discount_percentage / 100)
        {
          name: max_discount_promotion.name,
          discount_percentage: discount_percentage,
          sale_price: sale_price.round(2)
        }
      else
        { name: "Regular Price", discount_percentage: 0, sale_price: price }
      end
    else
      { name: "Regular Price", discount_percentage: 0, sale_price: price }
    end
  end

  validates :name, presence: true
  validates :description, presence: true
  validates :price, presence: true
  validates :inventory, presence: true
  validates :image_url, presence: true
  validates :thumbnail_url, presence: true

end
