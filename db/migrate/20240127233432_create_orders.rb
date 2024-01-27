class CreateOrders < ActiveRecord::Migration[7.1]
  def change
    create_table :orders do |t|
      t.references :customer, foreign_key: true
      t.date :order_date
      t.date :shipped_date
      t.decimal :subtotal_amount, precision: 8, scale: 2
      t.decimal :tax_amount, precision: 8, scale: 2
      t.decimal :total_amount, precision: 8, scale: 2
      t.timestamps
    end
  end
end
