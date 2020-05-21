class FeedController < ApplicationController
  before_action :authenticate_user!
  def index
    gon.current_user = current_user
  end
end
