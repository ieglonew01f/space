object false
object @conv
attributes :uuid
child(:user_details) do
    extends('users/local', :locals => { :user => @conv.with(current_user.uuid) })
end

child :messages do
    extends "messages/show"
end