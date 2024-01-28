class DropProductsTags < ActiveRecord::Migration[7.1]
  def change
    drop_table :products_tags
  end
end
