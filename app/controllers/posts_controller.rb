class PostsController < ApplicationController
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
    @post.uuid = SecureRandom.uuid
    @post.save!
  end

  # PATCH/PUT /posts/uuid
  # PATCH/PUT /posts/uuid.json
  def update
    respond_to do |format|
      if @post.update(post_params)
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { render :show, status: :ok, location: @post }
      else
        format.html { render :edit }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/uuid
  # DELETE /posts/uuid.json
  def destroy
    @post.destroy
    respond_to do |format|
      format.html { redirect_to posts_url, notice: 'Post was successfully destroyed.' }
      format.json { head :no_content }
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
