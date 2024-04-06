import Post from '@models/post';
import { connectToDB } from '@utils/database';

export const GET = async () => {
  await connectToDB();
  try {
    const postList = await Post.find({}).populate('user');
    return new Response(JSON.stringify(postList), {status: 200});
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({error: error.message}), {status: 500});
  }
};
