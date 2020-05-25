class AddByIdToConversations < ActiveRecord::Migration[6.0]
  def change
    add_column :conversations, :by_id, :integer
  end
end
