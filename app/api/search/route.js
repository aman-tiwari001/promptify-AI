import Post from '@models/post';
import { connectToDB } from '@utils/database';

export const POST = async (request) => {
  try {
    await connectToDB();
    let { q } = await request.json();
    q = q.toLowerCase();
    const AllPosts = await Post.find({}).populate('user');
    // return new Response(JSON.stringify({"reg": regex, q}));
    const results = AllPosts.filter((post) => {
      return (
        post.prompt.toLowerCase().includes(q) ||
        post.user.username.toLowerCase().includes(q) ||
        post.tag.toLowerCase().includes(q)
      );
    });
    return new Response(JSON.stringify(results), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
