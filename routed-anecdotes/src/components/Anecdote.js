import React from "react";
import { useParams } from "react-router-dom";

const Anecdote = ({ anecdoteById }) => {
  const { id } = useParams();
  const anecdote = anecdoteById(parseInt(id));
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <p>Has {anecdote.votes} vote(s).</p>
      <p>
        For more information, see <a href={anecdote.info}>{anecdote.info}</a>
      </p>
    </div>
  );
};

export default Anecdote;
