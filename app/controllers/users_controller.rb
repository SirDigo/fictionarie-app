class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create, :show, :index]

    #POST /signup
    def create
        user = User.new(user_params)
        if user.save
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    #GET
    def show
        user = User.find_by(id: params[:id])
        if user
            render json: user.to_json(include: :posts), status: :ok
        else
            render json: { error: "User not found" }, status: :not_found
        end
    end

    #GET
    def index
        render json: User.all, status: :ok
    end
  
    #GET /me
    def show_me
        render json: @current_user.to_json(include: :posts), status: :ok 
    end

    #PATCH
    def update
        user = @current_user
        user.update(user_params)
        render json: user, status: :ok
    end
  
    private
  
    def user_params
        params.permit(:username, :password, :password_confirmation, :image_url, :bio, :email)
    end
  
end
