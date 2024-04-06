'use client';

import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);

  const fetchMyPosts = async () => {
    const res = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await res.json();
    setPosts(data.results);
    if (typeof window !== 'undefined')
      localStorage.setItem('postData', JSON.stringify(data.results));
  };

  const handleDel = async (id) => {
    try {
      await fetch(`/api/prompt/${id}`, {
        method: 'DELETE',
      });
      await fetchMyPosts();
    } catch (error) {
      console.log('Unable to delete post : ', error);
    }
  };

  const handleEdit = async (post) => {
    router.push(
      `/edit-prompt/${post._id}?prompt=${post.prompt}&tag=${post.tag.replace(
        /#/g,
        '@'
      )}`
    );
  };

  useEffect(() => {
    if (session?.user.id) fetchMyPosts();
  }, []);

  return (
    <section>
      <Profile
        name='My'
        desc='Welcome to your personalized profile page'
        posts={posts}
        handleDel={handleDel}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default ProfilePage;
