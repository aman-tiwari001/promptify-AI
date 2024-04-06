'use client';

import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

const CreatePost = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [post, setPost] = useState({
    prompt: '',
    tag: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const createPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
          userId: session?.user.id,
        }),
      });
      if (response.ok) router.push('/');
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPost}
    />
  );
};

export default CreatePost;
