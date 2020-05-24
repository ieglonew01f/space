object false
object @user
attributes :uuid, :name, :avatar, :bio
node(:posts_count) { @user.posts.count }
node(:post_likes) { @total_likes }
node(:joined) { time_ago_in_words(@user.created_at) + " ago" }