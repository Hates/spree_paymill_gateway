Deface::Override.new name: "admin_products_left_fields",
                     virtual_path: "spree/payments/_payment",
                     insert_before: %{code[erb-silent]:contains("else")},
                     partial: "spree/payments/paymill_transaction"

