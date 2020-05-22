object false
collection @posts
attributes :uuid, :content, :content_type, :image
child(:user) { attributes :name, :avatar }