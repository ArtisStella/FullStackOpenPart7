import { useState } from "react";
import { Outlet } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AnecdoteList from "./components/AnecdoteList";
import Menu from "./components/Menu";
import About from "./components/About";
import CreateNew from "./components/CreateNew";
import Footer from "./components/Footer";
import Anecdote from "./components/Anecdote";

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: 1,
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: 2,
    },
  ]);

  const [notification, setNotification] = useState("");
  
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification("Added anecdote: " + anecdote.content);
    setTimeout(() => {
      setNotification("");
    }, 5000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id); 

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  const router = createBrowserRouter([
    {
      path: "/",
      children: [
        {
          path: "/",
          element: <AnecdoteList anecdotes={anecdotes} />,
        },
        {
          path: "/anecdotes/:id",
          element: <Anecdote anecdoteById={anecdoteById} />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/create",
          element: <CreateNew addNew={addNew} />,
        },
      ],
    },
  ]);

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <p>{notification}</p>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
      <Footer />
    </div>
  );
};

export default App;
