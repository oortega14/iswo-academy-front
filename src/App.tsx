import './App.css';

interface Props {
  children: React.ReactNode;
}

function App({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}

export default App;
