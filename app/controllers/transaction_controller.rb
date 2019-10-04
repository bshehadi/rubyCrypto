class TransactionController < ApplicationController
    include CurrentUserConcern

    def add
        transaction = Transaction.create!(
            user_id: @current_user.id,
            currency_id: params["currency_id"],
            rebalance: params["rebalance"]
        )
        transaction.current_price = transaction.currency.current_price()
        transaction.save
        if transaction
            render json: {
                transaction: transaction
            }
        else
            render json: {
                status:500
            }
        end
    end

end