class AddDescToEvents < ActiveRecord::Migration[6.0]
  def change
    add_column :events, :desc, :string
  end
end