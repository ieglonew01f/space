object false
object @message
attributes :uuid, :message, :conv_id, :seen, :for_id, :by_id
node(:incoming_message) { |message| message.for_id == current_user.id }
child(:sender) { attributes :id, :uuid, :name, :avatar }