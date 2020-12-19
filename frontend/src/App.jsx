import React from 'react';
import { useRoutes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import JoinGame from './pages/JoinGame';
import GameStart from './pages/GameStart';

// Nested dashboard routes
import MainView from './pages/Admin/Dashboard/MainView';
import Quizzes from './pages/Admin/Dashboard/Quizzes';
import QuizEdit from './pages/Admin/Dashboard/QuizEdit';
import QuizUpload from './pages/Admin/Dashboard/QuizEdit/QuizUpload';
import QuizAPIDownload from './pages/Admin/Dashboard/QuizEdit/QuizAPIDownload';
import Results from './pages/Admin/Dashboard/Results';

const routes = [
  {
    path: '/',
    element: <Dashboard />,
    children: [
      { path: '/', element: <MainView /> },
      { path: '/quizzes', element: <Quizzes /> },
      { path: '/quizzes/upload', element: <QuizUpload /> },
      { path: '/quizzes/download', element: <QuizAPIDownload /> },
      { path: '/quiz/:id/edit', element: <QuizEdit /> },
      { path: '/quiz/:id/question/:questionId/edit', element: <QuizEdit /> },
      { path: '/quiz/:id/results/:sessionId', element: <Results /> },
    ],
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
    children: [
      { path: '/', element: <MainView /> },
      { path: '/quizzes', element: <Quizzes /> },
      { path: '/quizzes/upload', element: <QuizUpload /> },
      { path: '/quizzes/download', element: <QuizAPIDownload /> },
      { path: '/quiz/:id/edit', element: <QuizEdit /> },
      { path: '/quiz/:id/question/:questionId/edit', element: <QuizEdit /> },
      { path: '/quiz/:id/results/:sessionId', element: <Results /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/join/:id', element: <JoinGame /> },
  { path: '/join/:id/start/:playerId', element: <GameStart /> },

];

function App() {
  const element = useRoutes(routes);

  return (
    <>{element}</>
  );
}

export default App;
