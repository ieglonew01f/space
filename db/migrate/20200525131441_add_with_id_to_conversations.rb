class AddWithIdToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :with_id, :integer
  end
end
