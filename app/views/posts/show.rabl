object false
object @post
attributes :uuid, :content, :content_type, :image, :content_meta
child(:user) { attributes :id, :uuid, :name, :avatar }
node(:timestamp) { |post| time_ago_in_words(post.created_at) + " ago" }
node(:likes) { |post| post.post_likes.count }
node(:logged_user_like) { |post| post.post_likes.where('user_id = ?', current_user.id).exists? }