class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :password_digest
      t.string :bio
      t.string :image_link
      t.string :role, default: 'User'
      t.string :email

      t.timestamps
    end
  end
end
