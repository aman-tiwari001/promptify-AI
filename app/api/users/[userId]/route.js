import User from '@models/user';

export const GET = async (request, { params }) => {
  try {
    const user = await User.findById(params.userId);
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log('Unable to get user details', error);
    return new Response(JSON.stringify({ error: error.message }));
  }
};
