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
        obj = {
                currency: transaction.currency.name,
                rebalance: transaction.rebalance,
                priceBoughtAt: transaction.current_price,
                slug: transaction.currency.currency_symbol,
                date: transaction.created_at
            }
        if transaction
            render json: {
                transaction: obj
            }
        else
            render json: {
                status:500
            }
        end
    end

    def getAll
        # Category.includes(articles: [{ comments: :guest }, :tags])
        transactions = Transaction.where(:user_id => @current_user.id)
        arr = [];
        transactions.each do |transaction|
            obj = {
                currency: transaction.currency.name,
                rebalance: transaction.rebalance,
                priceBoughtAt: transaction.current_price,
                slug: transaction.currency.currency_symbol,
                date: transaction.created_at
            }
            arr.push(obj)
        end

        if arr
            render json:{
                transactions: arr,
            }
        else
            render json: {
                status: 500
            }
        end
    end
end