object @post
attributes :uuid, :content, :content_type, :image, :content_meta
child(:user) { attributes :id, :uuid, :name, :avatar }
node(:timestamp) { time_ago_in_words(@post.created_at) + " ago" }