class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :bio, :image_link, :role
end
