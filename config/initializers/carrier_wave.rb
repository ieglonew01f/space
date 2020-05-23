CarrierWave.configure do |config|
  config.fog_provider = 'fog/aws'
  config.fog_credentials = {
    provider:              'AWS',
    aws_access_key_id:     ENV["AWS_ACCESS_KEY"] || "",
    aws_secret_access_key: ENV["AWS_SECRET_KEY"] || "",
    region:                ENV["AWS_REGION"] || 'ap-south-1'
  }
  config.fog_directory  = ENV["AWS_BUCKET"]
  config.fog_public     = false
  config.fog_attributes = { cache_control: "public, max-age=#{365.day.to_i}" }
end