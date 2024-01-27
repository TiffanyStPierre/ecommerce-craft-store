class CreatePromotions < ActiveRecord::Migration[7.1]
  def change
    create_table :promotions do |t|
      t.string :name
      t.decimal :percent_discount, precision: 5, scale: 2
      t.date :start_date
      t.date :end_date
      t.timestamps
    end
  end
end
