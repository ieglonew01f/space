object false
collection @posts
attributes :uuid, :content, :content_type
child(:user) { attributes :name }