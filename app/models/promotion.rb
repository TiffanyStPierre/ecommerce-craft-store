class Promotion < ApplicationRecord
  has_and_belongs_to_many :products, join_table: 'promotions_products'

  def finished?
    end_date < Date.current
  end

  def upcoming?
    start_date > Date.current
  end

  def active?
    !upcoming? && !finished?
  end
  
end
