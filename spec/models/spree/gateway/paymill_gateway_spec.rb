require 'spec_helper'

describe Spree::Gateway::PaymillGateway, type: :model do

  let(:gateway) { described_class.create!(name: 'PaymillGateway') }

  describe '#provider_class' do

    it 'is a PaymillGateway gateway' do
      expect(subject.provider_class).to eq ::Spree::Gateway::PaymillGateway
    end

  end

  describe '#payment_source_class' do

    it 'is a PaymillTransaction source' do
      expect(subject.payment_source_class).to eq ::Spree::PaymillTransaction
    end

  end

end
