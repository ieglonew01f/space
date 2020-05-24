class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def show
    @total_likes = 0
    @user.posts.each do |p|
      likes = p.post_likes.where('user_id != ?', @user.id)
      @total_likes = @total_likes + likes.count
    end
  end

  def update
    begin
      if @user.id != current_user.id
        raise "not allowed"
      end

      @user.update(user_params)

      if !@user.bio.blank? && !@user.avatar.url.blank?
        @user.complete = 'true'
      end

      @user.save!

      success_json(200, I18n.t("api.success"), @user)
    rescue Exception => e
      error_json(422, 422, e.message)
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find_by_uuid(params[:id] || current_user.uuid)
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.permit(:name, :avatar, :bio)
    end
end
