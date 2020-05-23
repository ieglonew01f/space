class Post < ApplicationRecord
  belongs_to :user
  has_many :post_likes

  mount_uploader :image, ImagePostUploader

  after_create_commit { EventBroadcastJob.perform_later self }
  after_update_commit { EventBroadcastJob.perform_later self }
end
