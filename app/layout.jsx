import Nav from '@components/Nav';
import Provider from '@components/Provider';
import '@styles/globals.css';

export const metadata = {
  title: 'Proptify',
  description: 'Discover & Share AI prompts',
};

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <div className='main'>
            <div className='gradient'></div>
          </div>
          <main className='app'>
            <Nav />
            {children}
          </main>
          <div className='text-black mx-auto text-center w-full  my-8'>
            Developed by{' '}
            <a
              className='text-blue-700 underline'
              href='http://linkedin.com/in/aman-tiwari001'
              target='_blank'
            >
              Aman Tiwari
            </a>{' '}
            with 💓
          </div>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
