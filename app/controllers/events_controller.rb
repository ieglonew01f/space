class EventsController < ApplicationController
  before_action :set_event, only: [:update, :destroy]

  # GET /events
  def index
    @events = Event.where('date = ?', params[:date])
  end

  # POST /events
  def create
    @event = Event.new(event_params)
    @event.save!
  end

  # PATCH/PUT /events/1
  def update
    @event.update(event_params)
  end

  # DELETE /events/1
  def destroy
    @event.destroy
    render :json => {:msg => 'Event was successfully destroyed.'}
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_event
      @event = Event.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def event_params
      params.require(:event).permit(:title, :start_time, :end_time, :date)
    end
end
