class PromptsController < ApplicationController
    skip_before_action :authorize, only: [:show, :index]
    
    #GET
    def index
        render json: Prompt.all, status: :ok
    end

    #GET
    def show
        render json: Prompt.last, status: :ok
    end

    #POST
    def create
        prompt = Prompt.new(prompt_params)
        if prompt.save
            render json: prompt, status: :ok
        else
            render json: { errors: [prompt.errors.full_messages] }, status: :unprocessable_entity
        end
    end

    #Private Methods
    private

    def prompt_params
        params.permit(:day_title, :body)
    end
end
