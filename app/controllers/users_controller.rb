class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def update
    begin
      if @user.id != current_user.id
        raise "not allowed"
      end

      @user.update(post_params)

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
    def set_post
      @user = User.find(current_user.id)
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.permit(:name, :avatar, :bio)
    end
end
