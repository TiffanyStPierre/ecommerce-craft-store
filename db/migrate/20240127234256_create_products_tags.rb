class CreateProductsTags < ActiveRecord::Migration[7.1]
  def change
    create_table :products_tags do |t|
      t.references :product, foreign_key: true
      t.references :tag, foreign_key: true
      t.timestamps
    end
  end
end
