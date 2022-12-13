import { useEffect } from "react";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";

const AllQuotes = ()=>{
    const {sendRequest, status, data, error}= useHttp(getAllQuotes, true);

    useEffect(
        ()=>{
            sendRequest();
        }, [sendRequest]
    )

    if(status==='pending'){
        return <div className="centered">
            <LoadingSpinner/>
        </div>
    }

    if(status==='error'){
        return <div className="centered">{error}</div>
    }

    if(status==='completed' && (!data|| data.length===0)){
        return <div className="centered">
            <NoQuotesFound/>
        </div>
    }

    return (
        <QuoteList quotes={data}/>
    );
};

export default AllQuotes;