include ActionView::Helpers::DateHelper

class EventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(event)
    ActionCable.server.broadcast 'news_feed_channel', message: render_event(event)
  end

  private

  def render_event(event)
    @post = event
    hash = {:id => @post.user.id}
    @current_user_id = @post.user.id

    if !@post.content.blank?
      Rabl::Renderer.json(@post, 'posts/show', :view_path => 'app/views')
    end
  end
end
