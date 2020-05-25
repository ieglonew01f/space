class ConversationsController < ApplicationController
  def index
    @conv = Conversation.where('by_id = ?', current_user.uuid)
  end

  def show
    @conv = Conversation.where("with_id = ? AND by_id = ?", params[:id], current_user.uuid).take

    if @conv.blank?
      @conv = Conversation.where("with_id = ? AND by_id = ?", current_user.uuid, params[:id]).take
    end
  
    if @conv.blank?
      create_conv(params)
    end
  end

  private
    def create_conv(params)
      @conv = Conversation.new
      @conv.uuid = SecureRandom.uuid
      @conv.with_id = params[:id]
      @conv.by_id = current_user.uuid
      @conv.save!
    end
end
