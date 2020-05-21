class NewsFeedChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "news_feed_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
