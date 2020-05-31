class EventsController < ApplicationController
  def index
    begin
      user_messages = Message.where("for_id = ?", current_user.id)
      user_messages = user_messages.where("seen = ? OR seen = ?", nil, false)

      success_json(200, I18n.t("api.success"), {:unread_messages => user_messages.count})
    rescue Exception => e
      error_json(422, 422, e.message)
    end
  end
end
