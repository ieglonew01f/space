object false
object @conv
attributes :uuid
child(:user_details) do
    extends('users/local', :locals => { :user => @conv.with(current_user.uuid) })
end

child @conv.messages.order('id DESC').limit(10).reverse => :messages do
    extends "messages/show"
end