class Post < ApplicationRecord
  belongs_to :user
  belongs_to :promt
  has_many :comments
end
