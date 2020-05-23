class ImagePostUploader < CarrierWave::Uploader::Base
  # Include RMagick or MiniMagick support:
  # include CarrierWave::RMagick
  include CarrierWave::MiniMagick

  def default_url(*args)
    ActionController::Base.helpers.asset_path("")
  end

  # Use file for local development
  if Rails.env.development?
    storage :file
  end

  # Use aws s3 for production
  if Rails.env.production?
    storage :fog
  end

  # Override the directory where uploaded files will be stored.
  # This is a sensible default for uploaders that are meant to be mounted:
  def store_dir
    "uploads/#{model.class.to_s.underscore}/#{mounted_as}/#{model.id}"
  end

  # Provide a default URL as a default if there hasn't been a file uploaded:
  # def default_url(*args)
  #   # For Rails 3.1+ asset pipeline compatibility:
  #   # ActionController::Base.helpers.asset_path("fallback/" + [version_name, "default.png"].compact.join('_'))
  #
  #   "/images/fallback/" + [version_name, "default.png"].compact.join('_')
  # end

  # Process files as they are uploaded:
  process resize_to_fill_overide: [500, 500]

  #
  # def scale(width, height)
  #   # do something
  # end

  # Create different versions of your uploaded files:
  version :thumb do
    process resize_to_fill_overide: [50, 50]
  end

  # Add a white list of extensions which are allowed to be uploaded.
  # For images you might use something like this:
  def extension_whitelist
    %w(jpg jpeg gif png)
  end

  def resize_to_fill_overide(width, height)
    if @file.content_type == "image/gif"
      gif_safe_transform! do |image|
        image.resize "#{840}x#{620}" # Perform any transformations here.
      end
    else
      # Process other filetypes if necessary.
      return resize_to_fill(width, height)
    end
  end
  
  def gif_safe_transform!
    MiniMagick::Tool::Convert.new do |image|
      image << @file.path
      image.coalesce # Remove optimizations so each layer shows the full image.
  
      yield image
  
      image.layers "Optimize" # Re-optimize the image.
      image << @file.path
    end
  end

  # Override the filename of the uploaded files:
  # Avoid using model.id or version_name here, see uploader/store.rb for details.
  # def filename
  #   "something.jpg" if original_filename
  # end
end