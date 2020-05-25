class MessagesController < ApplicationController
  before_action :authenticate_user!

  def create
    conv = Conversation.find_by_uuid(params[:conv_id])
    user = User.find_by_uuid(params[:for_id])

    # Update timestamp for conv
    # to be used by filtering
    conv.touch

    @message = Message.new
    @message.conversation_id = conv.id
    @message.message = params[:message]
    @message.for_id = user.id
    @message.seen = false
    @message.by_id = current_user.id
    @message.uuid = SecureRandom.uuid
    @message.save!
  end
end
