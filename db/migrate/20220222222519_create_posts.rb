class CreatePosts < ActiveRecord::Migration[7.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :body
      t.integer :likes
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :promt, null: false, foreign_key: true

      t.timestamps
    end
  end
end
