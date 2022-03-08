class Prompt < ApplicationRecord
    has_many :posts

    validates :day_title, presence: true, uniqueness: true
    validates :body, presence: true
end
