class CreateOrdersProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :orders_products do |t|
      t.references :order, foreign_key: true
      t.references :product, foreign_key: true
      t.integer :product_quantity
      t.timestamps
    end
  end
end
