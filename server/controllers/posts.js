import Post from "../models/Post.js";
import asyncHandler from "../utils/asyncHandler.js";
import ErrorResponse from "../utils/ErrorResponse.js";

// Create a new post
export const createPost = asyncHandler(async (req, res, next) => {
  const { plantId, title, content, date } = req.body;
  const uid = req.uid;

  const newPost = await Post.create({
    plant: plantId,
    title,
    content,
    date,
    user: uid,
  });

  // Populate the user information in the newly created post
  const populatedPost = await Post.findById(newPost._id).populate("user");

  res.status(201).json(populatedPost);
});

// Get all posts
export const getAllPost = asyncHandler(async (req, res, next) => {
  const posts = await Post.find().populate("user");

  if (!posts.length) {
    return next(new ErrorResponse("Posts not found", 404));
  }

  res.json(posts);
});

// Get a single post by ID
export const getPostById = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;

  const post = await Post.findById(postId).populate("user");

  if (!post) {
    return next(new ErrorResponse(`Post not found with ID ${postId}`, 404));
  }

  res.status(200).json(post);
});

// Update a post by ID
export const updatePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;
  const { title, content, date } = req.body;
  const uid = req.uid;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new ErrorResponse(`Post not found with ID ${postId}`, 404));
  }

  // Ensure the user owns the post before updating
  if (post.user.toString() !== uid) {
    return next(
      new ErrorResponse("You are not authorized to update this post", 403)
    );
  }

  const updatedPost = await Post.findByIdAndUpdate(
    postId,
    { title, content, date },
    { new: true, runValidators: true }
  ).populate("user");

  res.status(200).json(updatedPost);
});

// Delete a post by ID
export const deletePost = asyncHandler(async (req, res, next) => {
  const postId = req.params.id;
  const uid = req.uid;

  const post = await Post.findById(postId);

  if (!post) {
    return next(new ErrorResponse(`Post not found with ID ${postId}`, 404));
  }

  // Ensure the user owns the post before deleting
  if (post.user.toString() !== uid) {
    return next(
      new ErrorResponse("You are not authorized to delete this post", 403)
    );
  }

  const deletedPost = await Post.findByIdAndDelete(postId).populate("user");

  res.json({ success: `Post with ID ${postId} was deleted` });
});
