import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import { Fragment, useEffect } from "react";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetails = () => {
  const match = useRouteMatch();
  const params = useParams();
  const quoteId = params.quoteId;
  const { sendRequest, status, error, data } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (status === "error") {
    return <div className="centered">{error}</div>;
  }

  if (data.text.length === 0) return <p>No Quotes Found!!</p>;
  return (
    <Fragment>
      <HighlightedQuote text={data.text} author={data.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn" to={`${match.url}/comments`}>Load Comments</Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetails;
