'use client';

import { useSession } from 'next-auth/react';
import Profile from '@components/Profile';
import { useEffect, useState } from 'react';

const PublicProfilePage = ({ params }) => {
  const userId = params.userId;
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  const handleDel = async () => {};

  const handleEdit = async () => {};

  useEffect(() => {
    const fetchUserPosts = async () => {
      const postRes = await fetch(`/api/users/${userId}/posts`);
      const userRes = await fetch(`/api/users/${userId}`);
      const postData = await postRes.json();
      const userData = await userRes.json();
      setPosts(postData.results);
      setUser(userData);
    };
    fetchUserPosts();
  }, []);

  return (
    <section>
      <Profile
        name={user.name}
        username={user.username}
        desc={`Welcome to @${user.username} profile page`}
        posts={posts}
        handleDel={handleDel}
        handleEdit={handleEdit}
      />
    </section>
  );
};

export default PublicProfilePage;
