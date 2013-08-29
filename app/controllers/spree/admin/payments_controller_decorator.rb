Spree::Admin::PaymentsController.class_eval do

  private

  def object_params
    if params[:payment] and params[:payment_source] and source_params = params.delete(:payment_source)[params[:payment][:payment_method_id]]
      params[:payment][:source_attributes] = source_params
    end
    params.require(:payment).permit(:amount, :payment_method_id, {source_attributes: [:token_id]})
  end

end
