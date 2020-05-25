class AddUuidToMessages < ActiveRecord::Migration[6.0]
  def change
    add_column :messages, :uuid, :string
  end
end
