class PostsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show]

    #GET 
    def index
        render json: Post.all, status: :ok
    end

    #GET
    def show
        render json: @post.all.to_json(include: :comments), status: :ok
    end

    #POST
    def create
        post = Post.new(post_params)
        if post.save
            render json: post, status: :created
        else
            render json: { errors: [post.errors.full_messages] }, status: :unprocessable_entity
        end
    end

    #PATCH
    def update
        @post.update(post_params)
        render json: @post, status: :ok
    end

    #DELETE
    def destroy
        @post.destroy
        head :no_content
    end

    #Private Methods
    private

    def find_by_id
        @post = Post.find_by_id(id: params[:id])

        render json: { error: ["Post not found"] }, status: :not_found, unless @post
    end

    def post_params
        params.permit(:title, :body, :likes)
    end
end
