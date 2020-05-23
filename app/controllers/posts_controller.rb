class PostsController < ApplicationController
  before_action :authenticate_user!
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all.order("id DESC")
  end

  # GET /posts/uuid
  # GET /posts/uuid.json
  def show
  end

  # GET /posts/uuid/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    @post = Post.new
    @post.user_id = current_user.id
    @post.content = params[:content]
    @post.content_type = params[:content_type]
    @post.image = params[:image]
    @post.content_meta = params[:meta]
    @post.uuid = SecureRandom.uuid
    @post.save!
  end

  # PATCH/PUT /posts/uuid
  # PATCH/PUT /posts/uuid.json
  def update
    begin
      @post.update(post_params)
      success_json(200, I18n.t("api.success"), {})
    rescue Exception => e
      error_json(422, 422, e.message)
    end
  end

  # DELETE /posts/uuid
  # DELETE /posts/uuid.json
  def destroy
    begin
      if @post.user.id != current_user.id
        raise "not allowed"
      end

      @post.destroy!
      success_json(200, I18n.t("api.success"), {})
    rescue Exception => e
      error_json(422, 422, e.message)
    end
  end

  def parse_link
    begin
      raise 'url not provided' if params[:url].nil?
      page = MetaInspector.new(params[:url])
      raise 'unable to parse link' if page.response.status != 200

      parsed_data = {
        'title': page.title,
        'description': page.description,
        'best_image': page.images.best,
        'favicon': page.images.favicon,
        'url': page.url,
        'root_url': page.root_url,
        'is_video': (page.root_url.include? "youtube")
      }

      success_json(200, I18n.t("api.success"), parsed_data)
    rescue Exception => e
      error_json(422, 422, e.message)
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find_by_uuid(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def post_params
      params.require(:post).permit(:content, :content_type, :meta)
    end
end
