var SpreePaymillHandler = function() {

  var SpreePaymillHandlerConstructor = function() {
    this.paramMethod = PAYMILL_PAYMENT_METHOD_ID;


    this.$paymentForm = $("#checkout_form_payment");
    this.$paymentContainer = this.$paymentForm.find("#paymill-container");
    this.$cardAmount = this.$paymentForm.find("#card_amount");
    this.$cardCurrency = this.$paymentForm.find("#card_currency");

    this.$submitButton = this.$paymentForm.find(".continue.button.primary");
  }

  SpreePaymillHandlerConstructor.prototype = {

    init: function(element) {
      var self = this;

      self.$paymentForm.on("submit", function(event) {
        var paymentMethodSelector = "input[id*='payment_method_id']:checked";
        var paymentMethod = self.$paymentForm.find(paymentMethodSelector).val();

        // If a different payment method is selected then return.
        if(paymentMethod !== self.paramMethod) {
          return;
        }

        event.stopPropagation();
        event.preventDefault();

        paymill.createTokenViaFrame({
            amount_int: self.$cardAmount.val(),
            currency: self.$cardCurrency.val()
          },
          function(error, result) {
            if (error) {
              self.$submitButton.removeAttr('disabled');
              self.$submitButton.removeClass('disabled');
              self.$submitButton.addClass('primary');
            } else {
              var $token_field = $("<input>");
              $token_field.attr("name", "payment_source[" + self.paramMethod + "][token_id]");
              $token_field.attr("type", "hidden");
              $token_field.val(result.token);
              self.$paymentForm.append($token_field);
              self.$paymentForm.off('submit').submit();
            }
          }
        );

      });

      $.getScript("https://bridge.paymill.com/dss3", function() {
        paymill.embedFrame(
          self.$paymentContainer,
          { lang: 'en' },
          function(error) {
            // What to do here?
          }
        );
      });

    },

  };

  return SpreePaymillHandlerConstructor;
}();
