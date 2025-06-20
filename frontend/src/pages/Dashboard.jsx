import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import useCurrentUser from '../Hooks/useCurrentUser';
import useHabits from '../Hooks/useHabits';
import Clock from '../Components/Clock';
import HabitsDialog from '../Components/HabitsDialog';
import Footer from '../Components/Footer';
import { checkUserAuth, getCurrentUserData } from '../Api/user';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const [loginStatus, setLoginStatus] = useState(false);
  const [username, setUsername] = useState('');
  
  //checks the user authentication
  useEffect(() => {
    const checkUser = async () => {
      try {
        const response = await checkUserAuth();
          setLoginStatus(response.data.loggedIn);
        } catch (err) {
          console.log(err)
        }
      }
      checkUser();
    }, []);
  
  if(!loginStatus){ navigate('/dashboard') };
  
  //needs changing
  const { user, loading } = useCurrentUser();
  
  useEffect(() => {
          const getUserData = async () => {
              try {
                  const response = await checkUserAuth();
                  setLoginStatus(response.data.loggedIn);
              } catch (err) {
                  console.log(err)
              }
          }
          checkUser();
      }, []);

  const { habits, habitsError, habitsLoading } = useHabits();

  useEffect(() => {
    if(user) { setUsername(user.username) };
  }, [user])

  if (loading, habitsLoading) return <p>loading data...</p>;
  if(habitsError) return <p>{habitsError.message}</p>
  

  return (
      <main className="flex flex-col h-screen relative">
      {/* Header with Logo */}
      <header className="absolute top-6 left-6 z-20">
        <h1 className="text-4xl font-bold tracking-tight select-none">
          <span className="text-cyan-400 drop-shadow-[0_4px_8px_rgba(34,211,238,0.6)]">A</span>
          <span className="text-foreground drop-shadow-lg">rc</span>
          <span className="text-cyan-400 drop-shadow-[0_4px_8px_rgba(34,211,238,0.6)]">F</span>
          <span className="text-foreground drop-shadow-lg">low</span>
        </h1>
      </header>

      {/* Main Content - Properly Centered */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 pb-24">
        <section className="flex flex-col items-center gap-10 max-w-4xl w-full">
          {/* Welcome Message - Better Hierarchy */}
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-medium text-muted leading-tight">
              Welcome Back,
            </h2>
            <h2 className="text-6xl font-bold text-cyan-400 drop-shadow-[0_4px_12px_rgba(34,211,238,0.4)] leading-tight">
              {username || 'User'}
            </h2>
          </div>

          {/* Clock - Enhanced Spacing */}
          <div className="my-4">
            <Clock />
          </div>

          {/* Start Button - Better Design */}
          <div className="mt-6">
            <Dialog.Root>
              <Dialog.Trigger asChild>
                <button className="text-2xl font-medium border-2 border-accent text-accent px-12 py-4 rounded-2xl bg-surface/50 hover:bg-accent hover:text-accent-foreground hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 cursor-pointer transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface backdrop-blur-sm hover:text-white">
                Start Your Flow
              </button>
              </Dialog.Trigger>
              <HabitsDialog habits={habits}/>
            </Dialog.Root>
          </div>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default Dashboard;