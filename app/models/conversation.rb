class Conversation < ApplicationRecord
  has_many :messages, dependent: :destroy
  has_and_belongs_to_many :users

  def with(current_user_uuid)
    if current_user_uuid == self.with_id
      user = User.find_by_uuid(self.by_id)
      user
    else
      user = User.find_by_uuid(self.with_id)
    end

    user
  end
end
