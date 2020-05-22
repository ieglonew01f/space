class ApplicationController < ActionController::Base
  include ApplicationHelper
  protect_from_forgery with: :exception

  def after_sign_in_path_for(resource)
    '/'
  end

  def after_sign_out_path_for(resource_or_scope)
    '/users/sign_in'
  end
end
