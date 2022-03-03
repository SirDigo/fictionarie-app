class CreatePrompts < ActiveRecord::Migration[7.0]
  def change
    create_table :prompts do |t|
      t.string :day_title
      t.string :body

      t.timestamps
    end
  end
end
