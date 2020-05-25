class CreateMessages < ActiveRecord::Migration[6.0]
  def change
    create_table :messages do |t|
      t.string :message
      t.integer :by_id
      t.integer :for_id
      t.boolean :seen

      t.timestamps
    end
  end
end
