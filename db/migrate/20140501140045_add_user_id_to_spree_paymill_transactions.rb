class AddUserIdToSpreePaymillTransactions < ActiveRecord::Migration
  def change
    add_column :spree_paymill_transactions, :user_id, :integer
  end
end
