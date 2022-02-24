class Promt < ApplicationRecord
    has_many :posts

    validates :day_title, presence: true
    validates :body, presence: true
end
