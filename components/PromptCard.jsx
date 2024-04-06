import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const PromptCard = ({
  post,
  handleEdit,
  handleDel,
  hashTagClick,
  genAIOutputPopUp,
}) => {
  const { data: session } = useSession();
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleCopy = (e) => {
    navigator.clipboard.writeText(post.prompt);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  return (
    <div className='prompt_card md:min-w-[25%]'>
      <div className='flex justify-between'>
        <div
          className='flex flex-center gap-2 cursor-pointer'
          onClick={() => router.push(`/profile/${post.user._id}`)}
        >
          <Image
            className='rounded-full'
            src={post.user?.image}
            width={40}
            height={40}
            alt='user_image'
          />
          <div className='flex flex-start flex-col'>
            <h2 className='text-lg font-satoshi font-semibold'>
              {post?.user.name}
            </h2>
            <h2 className='text-sm font-inter text-gray-500'>
              {post?.user.username}
            </h2>
          </div>
        </div>
        {!copied ? (
          <Image
            className=''
            src={'/assets/icons/copy.svg'}
            width={25}
            height={25}
            alt='copy_btn'
            onClick={handleCopy}
          />
        ) : (
          <Image
            className=''
            src={'/assets/icons/tick.svg'}
            width={25}
            height={25}
            alt='copy_btn'
          />
        )}
      </div>
      <div className='flex flex-start flex-col font-inter my-3 text-left'>
        <p className='mb-3'>{post.prompt}</p>
        <div className='flex flex-row gap-x-2 font-inter flex-wrap'>
          {post.tag.split(' ').map((item, idx) => (
            <span
              className='bg-gradient-to-tr from-orange-600 to-orange-400 hover:shadow-2xl hover:shadow-orange-500 cursor-pointer text-white rounded-md px-2 mt-2'
              key={idx}
              onClick={() => hashTagClick(item)}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => genAIOutputPopUp(post.prompt)}
        className='black_btn my-3'
      >
        Generate
      </button>
      {session?.user.id === post.user._id && pathname === '/profile' && (
        <div className='w-full flex-end gap-5'>
          <span
            className='green_gradient cursor-pointer'
            onClick={() => handleEdit(post)}
          >
            Edit
          </span>
          <span
            className='orange_gradient cursor-pointer'
            onClick={() => {
              if (confirm('Are you sure you want to delete this?'))
                handleDel(post._id);
            }}
          >
            Delete
          </span>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
