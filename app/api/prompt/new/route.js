const { default: Post } = require('@models/post');
const { connectToDB } = require('@utils/database');

export async function POST(req) {
  try {
    const { prompt, tag, userId } = await req.json();
    await connectToDB();
    const newPost = await Post.create({ prompt, tag, user: userId });

    return new Response(JSON.stringify(newPost), { status: 201 });
} catch (error) {
    console.log(error);
    return new Response(JSON.stringify({error: error.message}), { status: 500 });
  }
}
