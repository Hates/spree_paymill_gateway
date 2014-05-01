class AddPaymentMethodIdToSpreePaymillTransactions < ActiveRecord::Migration
  def change
    add_column :spree_paymill_transactions, :payment_method_id, :integer
  end
end
