class CreateProducts < ActiveRecord::Migration[7.1]
  def change
    create_table :products do |t|
      t.string :name
      t.string :image_url
      t.string :thumbnail_url
      t.text :description
      t.decimal :price, precision: 8, scale: 2
      t.integer :inventory
      t.timestamps
    end
  end
end
