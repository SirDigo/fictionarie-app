class CommentsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :get_post_comments]
    before_action :error_not_found, unless: :find_by_id, only: [:show, :destroy]

    #GET 
    def index
        render json: Comment.all, status: :ok
    end

    #GET
    def show 
        render json: @comment, status: :ok
    end

    #GET /posts/:id/comments
    def get_post_comments
        comments = Comment.where(post_id: params[:id])
        if comments
            render json: comments, status: :ok
        else
            render json: { error: ["Comment(s) not fuond"] }, status: :not_found
        end
    end

    #POST
    def create 
        comment = Comment.new(comment_params)
        if comment.save
            render json: comment, status: :created
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
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
        @comment = Comment.find_by(id: params[:id])
    end

    def error_not_found
        render json: { error: ["Comment not found"] }, status: :not_found 
    end

    def comment_params
        params.permit(:body, :post_id, :user_id)
    end
end
