Spree::Payment.class_eval do

  after_create :create_paymill_payment

  private

  def create_paymill_payment
    return unless is_paymill_payment?
    payment_method.create_profile(self)
  rescue ActiveMerchant::ConnectionError => e
    gateway_error e
  end

  def is_paymill_payment?
    source.is_a?(Spree::PaymillTransaction) && source.token_id && !source.payment_id && !source.transaction_id
  end

end

