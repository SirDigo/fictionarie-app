class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :bio, :image_link, :role
end
