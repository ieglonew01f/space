class ChangeChatColTypes < ActiveRecord::Migration[6.0]
  def change
    change_column :conversations, :with_id, :string
    change_column :conversations, :by_id, :string
  end
end
