object false
collection @conv
attributes :uuid
node(:timestamp) { |conv| time_ago_in_words(conv.updated_at) + " ago" }
node(:latest_message) do |conv|
    conv.messages.last.message
end
node :user_details do |conv|
    { :uuid => conv.with(current_user.uuid).uuid, :name => conv.with(current_user.uuid).name, :avatar => conv.with(current_user.uuid).avatar }
end