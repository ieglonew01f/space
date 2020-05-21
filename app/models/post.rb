class Post < ApplicationRecord
  belongs_to :user

  after_create_commit { EventBroadcastJob.perform_later self }
end
