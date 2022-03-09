class PostsController < ApplicationController
    skip_before_action :authorize, only: [:index, :show, :get_prompt_posts, :get_user_posts]
    before_action :error_not_found, unless: :find_by_id, only: [:show, :update, :destroy]

    #GET 
    def index
        render json: Post.all, status: :ok
    end

    #GET
    def show
        render json: @post, status: :ok
    end

    #GET /prompts/:id/posts
    def get_prompt_posts
        posts = Post.where(prompt_id: params[:id])
        if posts
            render json: posts.all.order("created_at DESC"), status: :ok
        else
            render json: { error: ["Post(s) not found"] }, status: :not_found
        end
    end

    #GET /users/:id/posts
    def get_user_posts
        posts = Post.where(user_id: params[:id])
        if posts
            render json: posts.all.order("created_at DESC"), status: :ok
        else
            render json: { error: ["Post(s) not found"] }, status: :not_found
        end
    end

    #POST
    def create
        post = Post.new(post_params)
        # byebug
        if post.save
            render json: post, status: :created
        else
            render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
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
        @post = Post.find_by(id: params[:id])
    end

    def error_not_found
        render json: { error: ["Post not found"] }, status: :not_found 
    end

    def post_params
        params.permit(:title, :body, :likes, :user_id, :prompt_id, :created_at)
    end
    
end