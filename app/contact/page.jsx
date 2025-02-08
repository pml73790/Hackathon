import Navbar from '@/components/Navbar';
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
