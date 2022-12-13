import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useHttp from '../../hooks/use-http';
import { getAllComments } from '../../lib/api';
import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params= useParams();
  const quoteId= params.quoteId;
  const {sendRequest, status, data}= useHttp(getAllComments);

  useEffect(()=>{
    sendRequest(quoteId);

  },[sendRequest, quoteId])

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  const addCommentHandler = useCallback(()=>{
    sendRequest(quoteId);
    setIsAddingComment(false);
  },[sendRequest, setIsAddingComment, quoteId]);

  let comments;
  if(status==='pending')
  comments = <div className='centered'><LoadingSpinner/></div>;

  if(status==="completed" && (data||data.length>0))
  comments = <CommentsList comments={data}/>;

  if(status==="completed" && (!data||data.length===0))
  comments= <p class="centered">No Comments</p>;
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm quoteId={quoteId} addCommentHandler={addCommentHandler}/>}
      {comments}
    </section>
  );
};

export default Comments;
