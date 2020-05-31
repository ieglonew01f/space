class EventChannel < ApplicationCable::Channel
  def subscribed
    stream_from "event_channel_#{params[:user]}"
  end

  def is_typing(data)
    event = {
      :is_typing => true,
      :value => data['is_typing'],
      :conv_id => data['conv_id']
    }
    ActionCable.server.broadcast "event_channel_#{data['for_id']}", event: event
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
