require "paymill"

module Spree
  class PaymillTransaction < ActiveRecord::Base

    has_many :payments, as: :source

    serialize :payment_response, Paymill::Payment
    serialize :transaction_response, Paymill::Transaction

    scope :with_payment_profile, -> { where('transaction_id IS NOT NULL') }

  end
end
