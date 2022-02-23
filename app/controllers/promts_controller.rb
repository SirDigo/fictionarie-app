class PromtsController < ApplicationController
    skip_before_action :authorize, only: [:show]
    
    #GET
    def show
        render json: Prompt.last, status: :ok
    end
end
