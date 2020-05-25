class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chat_#{params[:uuid]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
