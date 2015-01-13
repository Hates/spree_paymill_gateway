# SpreePaymillGateway

Paymill gateway for Spree. This uses the [Paymill Javascript Bridge](https://www.paymill.com/en-gb/documentation-3/reference/paymill-bridge/) 
for payments so no credit card details ever reach your server. This removes the hassle for PCI compliance.

## Installation

Add spree_paymill_gateway to your Gemfile:

```ruby
gem 'spree_paymill_gateway', :github => "Hates/spree_paymill_gateway"
```

Bundle your dependencies and run the installation generator:

```shell
bundle
bundle exec rails g spree_paymill_gateway:install
```

## Testing

Be sure to bundle your dependencies and then create a dummy test app for the specs to run against.

```shell
bundle
bundle exec rake test_app
bundle exec rspec spec
```

When testing your applications integration with this extension you may use it's factories.
Simply add this require statement to your spec_helper:

```ruby
require 'spree_paymill_gateway/factories'
```
