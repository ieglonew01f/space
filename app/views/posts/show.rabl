object false
object @post
attributes :uuid, :content, :content_type, :image
child(:user) { attributes :name, :avatar }