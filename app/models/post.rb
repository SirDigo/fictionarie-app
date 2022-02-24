class Post < ApplicationRecord
  belongs_to :user 
  belongs_to :promt
  has_many :comments, dependent: :destroy

  validates :title, presence: true, length: { maximum: 50, minimum: 1 }
  validates :body, presence: true, length: { maximum: 2500, minimum: 50 }
  validates :tags, length: { maximum: 50 }
end
