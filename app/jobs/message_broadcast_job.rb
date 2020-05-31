class MessageBroadcastJob < ApplicationJob
  queue_as :default

  def perform(message)
    user_messages = Message.where("for_id = ?", message.for_id)
    user_messages = user_messages.where("seen = ? OR seen = ?", nil, false)
    sender = message.sender
    event = {
      :unread_messages => user_messages.count,
      :new_message => {
        :uuid => message.uuid,
        :message => message.message,
        :seen => message.seen,
        :incoming_message => true,
        :user => {
          :uuid => sender.uuid,
          :name => sender.name,
          :avatar => sender.avatar
        }
      }
    }
    ActionCable.server.broadcast "event_channel_#{message.for_id}", event: event
  end
end


object false
object @message
attributes :uuid, :message, :conv_id, :seen, :for_id, :by_id
node(:incoming_message) { |message| message.for_id == current_user.id }
child(:sender) { attributes :id, :uuid, :name, :avatar }