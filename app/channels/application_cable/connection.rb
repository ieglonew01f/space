module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
 
    def connect
      self.current_user = current_user
    end
 
    private
      def find_verified_user
        if current_user.nil?
          reject_unauthorized_connection
        end
        current_user
      end
  end
end
