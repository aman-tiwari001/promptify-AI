import Link from 'next/link';
import Image from 'next/image';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const handleOnChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <section className='glassmorphism my-5'>
      <h2 className='head_text blue_gradient m-3'>{type} Post</h2>
      <p className='desc mx-3 my-5'>
        {type} and share your prompts around the world and let your imagination
        turns into reality with AI platform.
      </p>
      <form onSubmit={handleSubmit} className='mt-9 mx-3'>
        <label htmlFor='prompt' className='font-bold text-md font-satoshi'>
          Your AI Prompt :{' '}
        </label>
        <textarea
          className='form_textarea mb-5'
          name='prompt'
          id='prompt'
          cols='30'
          rows='10'
          placeholder='Write your prompt here...'
          value={post.prompt}
          onChange={handleOnChange}
        ></textarea>
        <label htmlFor='tag' className='font-bold text-md font-satoshi'>
          Tag :
        </label>
        <input
          className='form_input'
          type='text'
          id='tag'
          name='tag'
          placeholder='eg. #startup  #web  #app'
          value={post.tag}
          onChange={handleOnChange}
        />
        <div className='flex-end gap-5 mt-3'>
          <Link href='/'>Cancel</Link>
          <button
            className='bg-blue-700 text-white px-5 py-1.5 rounded-full hover:bg-blue-600'
            type='submit'
            disabled={submitting}
          >
            {submitting ? (
              <Image
                src='/assets/images/spinner2.gif'
                width={27}
                height={27}
                alt='spinner'
              />
            ) : (
              type
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
