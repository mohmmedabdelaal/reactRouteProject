import { Fragment ,useEffect} from 'react';

import { useParams,Route ,Link,useRouteMatch} from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import NoQuotesFound from '../components/quotes/NoQuotesFound';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import useHttp from '../hooks/use-http'
import {getSingleQuote} from '../lib/api'


const QuoteDetail = () => {
  const match = useRouteMatch()
  const params = useParams();

  const {quoteId} = params;

  const {sendRequest,status,data:loadedQuote,error} = useHttp(getSingleQuote,true)

  useEffect(() =>{
    sendRequest(quoteId)
  },[sendRequest,quoteId]);

  if(status === 'pending'){
    return(
      <div className='centered'>
        <LoadingSpinner/>
      </div>
    )
  }

  if(error){
    return <h4 className='centered'>{error}</h4>
  }

  if(!loadedQuote.text){
    return <NoQuotesFound/>
  }

  return (
    <Fragment>
      <HighlightedQuote author={loadedQuote.author} text={loadedQuote.text}/>
      <Route path={`${match.path}`} exact>
      <div className='centered'>
        <Link className='btn--flat' to={`${match.url}/comments`}>
          Load comments
        </Link>
      </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments/>
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;