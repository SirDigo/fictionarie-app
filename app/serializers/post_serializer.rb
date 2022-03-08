class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :likes, :created_at
  has_one :user
  # has_one :prompts
  # has_many :comments
end
