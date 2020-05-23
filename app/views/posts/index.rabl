object false
collection @posts
attributes :uuid, :content, :content_type, :image, :content_meta
node(:timestamp) { |post| time_ago_in_words(post.created_at) + " ago" }
child(:user) { attributes :id, :uuid, :name, :avatar }