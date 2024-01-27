class CreatePromotionsProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :promotions_products do |t|
      t.references :promotion, foreign_key: true
      t.references :product, foreign_key: true
      t.timestamps
    end
  end
end
