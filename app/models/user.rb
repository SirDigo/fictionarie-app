class User < ApplicationRecord
    has_secure_password

    has_many :comments, dependent: :destroy
    has_many :posts, dependent: :destroy
   
    validates :username, presence: true, uniqueness: true, length: { minimum: 3, maximum: 25 }

    #Strong password Regex
    validates :password_digest, presence: :true
    # format: { with:  /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[\W]).{8,}$/ },

    #Image Regex
    # validates :image_link, format: { with: /([^\\s]+(\\.(?i)(jpe?g|png|gif|bmp))$)/ }

    validates :role, presence: true, inclusion: { in: %w(User Admin) }

    validates :email, presence: true, uniqueness: true, format: { with: /.+@.+\..+/ }
end
