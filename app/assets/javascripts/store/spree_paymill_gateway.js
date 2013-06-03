var SpreePaymillHandler = function() {

  var SpreePaymillHandlerConstructor = function(options) {
    options = options || {};

    this.paramPrefix = options.prefix;

    this.$paymillForm = $(options.form);
    this.$cardAmount = this.$paymillForm.find("#card_amount");
    this.$cardCurrency = this.$paymillForm.find("#card_currency");
    this.$cardHolderName = this.$paymillForm.find("#card_holdername");
    this.$cardNumber = this.$paymillForm.find("#card_number");
    this.$cardCVC = this.$paymillForm.find("#card_code");
    this.$cardExpiryMonth = this.$paymillForm.find("#card_month");
    this.$cardExpiryYear = this.$paymillForm.find("#card_year");

    this.$submitButton = this.$paymillForm.find("input[type='submit']");
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
          self.$paymillForm.append($token_field);
          self.$paymillForm.get(0).submit();
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
            afterError(self.$cardExpiryMonth, "Please enter a valid expiry month.");
            break;
          case "field_invalid_card_exp_year":
            afterError(self.$cardExpiryMonth, "Please enter a valid expiry year.");
            break;
          case "field_invalid_card_exp":
            afterError(self.$cardExpiryMonth, "Please enter a valid expiry date.");
            break;
          case "field_invalid_card_cvc":
            afterError(self.$cardCVC, "Please enter a valid CVC number.");
            break;
        }

        self.$submitButton.prop('disabled', false);
      };

      var afterError = function(element, message) {
        element.after('<span class="error">' + message + '</span>');
      };

      var beforeError = function(element, message) {
        element.before('<span class="error">' + message +'</span><br>');
      };

      this.$paymillForm.submit(function(event) {
        event.stopPropagation();
        event.preventDefault();

        // Clear any errors.
        self.$paymillForm.find(".error").empty();

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
