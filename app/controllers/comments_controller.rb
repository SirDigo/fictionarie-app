class CommentsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]

    #GET 
    def index
        render json: Comment.all, status: :ok
    end

    #GET
    def show 
        render json: @comment, status: :ok
    end

    #POST
    def create 
        comment = Comment.new(comment_params)
        if comment.save
            render json: comment, status: :created
        else
            render json: { errors: [comment.errors.full_messages] }, status: :unprocessable_entity
        end
    end

    #DELETE
    def destroy
        @comment.destroy
        head :no_content
    end
    
    #Private Methods
    private

    def find_by_id
        @comment = comment.find_by(id: params{:id})

        render json: { error: ["Comment not found"] }, status: :not_found, unless @comment
    end

    def comment_params
        params.permit(:body)
    end
end
