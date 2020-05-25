class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  devise :omniauthable, omniauth_providers: [:google_oauth2]

  has_many :posts
  mount_uploader :avatar, AvatarUploader
  has_and_belongs_to_many :conversations, dependent: :destroy

  def self.from_omniauth(access_token)
    data = access_token.info
    user = User.where(email: data['email']).first

    # Uncomment the section below if you want users to be created if they don't exist
    unless user
        user = User.create(
           uuid: SecureRandom.uuid,
           name: data['name'],
           email: data['email'],
           password: Devise.friendly_token[0,20],
        )
    end
    user
  end

  def appear
    self.status = "online"
    self.save!
  end

  def disappear
    self.status = "offline"
    self.save!
  end

  def away
    self.status = "away"
    self.save!
  end

  def is_admin?
    self.user_role == "admin"
  end
end
