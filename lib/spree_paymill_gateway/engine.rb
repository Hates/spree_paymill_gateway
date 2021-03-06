module SpreePaymillGateway
  class Engine < Rails::Engine
    engine_name 'spree_paymill_gateway'

    config.autoload_paths += %W(#{config.root}/lib)

    # use rspec for tests
    config.generators do |g|
      g.test_framework :rspec
    end

    def self.activate
      Dir.glob(File.join(File.dirname(__FILE__), '../../app/**/*_decorator*.rb')) do |c|
        Rails.configuration.cache_classes ? require(c) : load(c)
      end
    end

    initializer "spree.gateway.paymill_method", :after => "spree.register.payment_methods" do |app|
      app.config.spree.payment_methods << Spree::Gateway::PaymillGateway

      Spree::PermittedAttributes.source_attributes << :token_id
    end

    config.to_prepare &method(:activate).to_proc
  end
end
