import Post from '@models/post';
import { connectToDB } from '@utils/database';

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const posts = await Post.find({ user: params.userId }).populate('user');
    return new Response(
      JSON.stringify({ totalPosts: posts.length, results: posts }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
