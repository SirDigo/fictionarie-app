class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :likes
  has_one :user
  # has_one :prompt
  # has_many :comments
end
