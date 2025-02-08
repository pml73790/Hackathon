import Navbar from '@/components/navbar';
import Contact from '@/components/contact';

const App = () => {
  return (
    <div>
      <Navbar isAuthorized={true} />
      <Contact />
    </div>
  );
};

export default App;
