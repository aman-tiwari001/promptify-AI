'use client';

import Form from '@components/Form';
import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

const EditPost = ({ params }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const searchParams = useSearchParams();

  const [post, setPost] = useState({
    prompt: searchParams.get('prompt'),
    tag: searchParams.get('tag').replace(/@/g, '#'),
  });
  const [submitting, setSubmitting] = useState(false);
  const editPost = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch(`/api/prompt/${params.postId}`, {
        method: 'PUT',
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
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={editPost}
    />
  );
};

export default EditPost;
