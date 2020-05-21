class EventBroadcastJob < ApplicationJob
  queue_as :default

  def perform(event)
    ActionCable.server.broadcast 'news_feed_channel', message: render_event(event)
  end

  private

  def render_event(event)
    @post = event
    # ApplicationController.renderer.render(partial: 'events/event', locals: { event: event })
    Rabl::Renderer.json(@post, 'posts/show', :view_path => 'app/views')
  end
end
