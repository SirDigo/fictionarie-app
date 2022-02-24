class PromtsController < ApplicationController
    skip_before_action :authorize, only: [:show, :index]
    
    #GET
    def index
        render json: Promt.all, status: :ok
    end

    #GET
    def show
        render json: Prompt.last, status: :ok
    end

    #POST
    def create
        promt = Promt.new(promt_params)
        if promt.save
            render json: promt, status: :ok
        else
            render json: { errors: [promt.errors.full_messages] }, status: :unprocessable_entity
    end

    #Private Methods
    private

    def promt_params
        params.permit(:day_title, :body)
    end
end
