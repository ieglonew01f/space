class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :uuid
      t.string :content
      t.string :content_type
      t.text :content_meta
      t.integer :user_id

      t.timestamps
    end
  end
end
