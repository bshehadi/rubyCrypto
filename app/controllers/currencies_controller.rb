class CurrenciesController < ApplicationController
	def index
	end
	
	def search
		@currencies = Currency.where('LOWER(name) LIKE ?',"%#{params[:search].downcase}%")
		render json: {currencies: @currencies}
	end

	def getCurrencyPrice
		#user = User.find_by(email: params["user"]["email"]).try(:authenticate, params["user"]["password"])
		currency = Currency.find_by(id: params["currency_id"])
		render json: {currency_price: currency.current_price() }
	end
	#Takes in currency id and the amount owned
	#Returns final calculation
	def calculate
		amount = params[:amount]
		render json: {
			currency: currency,
			current_price: currency.current_price,
			amount: amount,
			value: currency.calculate_value(amount)
		}
	end

	private
	def currency
		@currency ||= Currency.find(params[:id])
	end
end