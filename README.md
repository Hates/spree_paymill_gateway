# SpreePaymillGateway

Paymill gateway for Spree. This uses the [Paymill Javascript Bridge](https://www.paymill.com/en-gb/documentation-3/reference/paymill-bridge/) 
for payments so no credit card details ever reach your server. This removes the hassle for PCI compliance.

This can be used as the basis for Stripe Javascript payments to as they are very similar in practice.

## IMPORTANT NOTICE

There are no tests, so use this at your own risk. I am currently using the `2-2-stable` branch in production, which I may make changes to, but do not expect these changes to be merged into other branches.
Some extra checkins have been made to the `2-4-stable` branch, so choose your starting point for your own fork carefully.

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
