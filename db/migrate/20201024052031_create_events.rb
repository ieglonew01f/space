class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :start_time
      t.string :end_time
      t.string :date

      t.timestamps
    end
  end
end
