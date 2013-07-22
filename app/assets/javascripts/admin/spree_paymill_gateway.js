var SpreePaymillHandler = function() {

  var SpreePaymillHandlerConstructor = function(options) {
    options = options || {};

    this.paramPrefix = options.prefix;
    this.paramMethod = options.method;

    this.$paymentForm = $(options.form);
    this.$cardAmount = this.$paymentForm.find("#card_amount");
    this.$cardCurrency = this.$paymentForm.find("#card_currency");
    this.$cardHolderName = this.$paymentForm.find("#card_holdername");
    this.$cardNumber = this.$paymentForm.find("#card_number");
    this.$cardCVC = this.$paymentForm.find("#card_code");
    this.$cardExpiryMonth = this.$paymentForm.find("#card_month");
    this.$cardExpiryYear = this.$paymentForm.find("#card_year");

    this.$submitButton = this.$paymentForm.find("button[name='checkout']");
  }

  SpreePaymillHandlerConstructor.prototype = {

    init: function(element) {
      var self = this;

      var handlePaymillResponse = function(error, result) {
        if (error) {
          handlePaymillError(error);
        } else {
          var $token_field = $("<input>");
          $token_field.attr("name", self.paramPrefix + "[token_id]");
          $token_field.attr("type", "hidden");
          $token_field.val(result.token);
          self.$paymentForm.append($token_field);
          self.$paymentForm.get(0).submit();
        }
      };

      var handlePaymillError = function(error) {
        switch(error.apierror) {
          case "internal_server_error":
          case "invalid_public_key":
          case "unknown_error":
            beforeError(self.$submitButton, "There was an error processing your payment.");
            break;
          case "field_invalid_card_holder":
            afterError(self.$cardHolderName, "Please enter the card holder's name");
          case "field_invalid_card_number":
            afterError(self.$cardNumber, "Please enter a valid card number.");
            break;
          case "field_invalid_card_exp_month":
            afterError(self.$cardExpiryYear, "Please enter a valid expiry month.");
            break;
          case "field_invalid_card_exp_year":
            afterError(self.$cardExpiryYear, "Please enter a valid expiry year.");
            break;
          case "field_invalid_card_exp":
            afterError(self.$cardExpiryYear, "Please enter a valid expiry date.");
            break;
          case "field_invalid_card_cvc":
            afterError(self.$cardCVC, "Please enter a valid CVC number.");
            break;
        }

        self.$submitButton.removeAttr('disabled');
      };

      var afterError = function(element, message) {
        element.after('<span class="paymill-error">' + message + '</span>');
      };

      var beforeError = function(element, message) {
        element.before('<span class="paymill-error">' + message +'</span>');
      };

      this.$paymentForm.submit(function(event) {
        var paymentMethodSelector = "input[id*='payment_method_id']:checked";
        var paymentMethod = self.$paymentForm.find(paymentMethodSelector).val();

        // If a different payment method is selected then return.
        if(paymentMethod !== self.paramMethod) {
          return;
        }

        event.stopPropagation();
        event.preventDefault();

        self.$paymentForm.find(".paymill-error").empty();

        // Create the initial Paymill token.
        paymill.createToken({
          cardholder: self.$cardHolderName.val(),
          number: self.$cardNumber.val(),
          exp_month: self.$cardExpiryMonth.val(),
          exp_year: self.$cardExpiryYear.val(),
          cvc: self.$cardCVC.val(),
          amount_int: self.$cardAmount.val(),
          currency: self.$cardCurrency.val()
        }, handlePaymillResponse);
      });
    },

  };

  return SpreePaymillHandlerConstructor;
}();
