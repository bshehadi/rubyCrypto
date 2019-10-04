class Transaction < ApplicationRecord
  belongs_to :user
  belongs_to :currency

  def current_price
    puts self
  end
end
