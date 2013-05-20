class CreateSpreePaymillTransactions < ActiveRecord::Migration
  def change
    create_table :spree_paymill_transactions do |t|
      t.timestamps
      t.string :token_id, null: false
      t.string :payment_id
      t.text :payment_response
      t.string :transaction_id
      t.text :transaction_response
    end
  end
end
