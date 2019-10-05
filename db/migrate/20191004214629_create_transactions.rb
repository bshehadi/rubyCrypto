class CreateTransactions < ActiveRecord::Migration[5.2]
  def change
    create_table :transactions do |t|
      t.references :user, foreign_key: true
      t.references :currency, foreign_key: true
      t.decimal :current_price
      t.decimal :rebalance

      t.timestamps
    end
  end
end
