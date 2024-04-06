import Post from '@models/post';
import { connectToDB } from '@utils/database';

// GET PROMPT
export const GET = async (request, { params }) => {
  await connectToDB();
  try {
    const fetchedPost = await Post.findById(params.id);
    if (!fetchedPost)
      return new Response(JSON.stringify({ error: 'Post not found.' }), {
        status: 404,
      });
    return new Response(JSON.stringify(fetchedPost), { status: 200 });
  } catch (error) {
    console.log('Unable to fetch post : ', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

// EDIT PROMPT
export const PUT = async (request, { params }) => {
  await connectToDB();
  const { prompt, tag } = await request.json();
  try {
    const updatedPost = await Post.findByIdAndUpdate(params.id, {
      prompt,
      tag,
    });
    return new Response(JSON.stringify(updatedPost), { status: 202 });
  } catch (error) {
    console.log('Unable to update post : ', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};

// DELETE PROMPT
export const DELETE = async (request, { params }) => {
  await connectToDB();
  try {
    const deletedPost = await Post.findByIdAndDelete(params.id);
    return new Response(JSON.stringify(deletedPost), { status: 203 });
  } catch (error) {
    console.log('Unable to delete post : ', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
