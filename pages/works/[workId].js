import { useRouter } from 'next/router';
import useSWR from 'swr';

import Error from 'next/error'; // https://nextjs.org/docs/advanced-features/custom-error-page#reusing-the-built-in-error-page
import PageHeader from '@/components/PageHeader';
import BookDetails from '@/components/BookDetails';

export default function Work() {
  const router = useRouter();
  const { workId } = router.query;
  const { data, error, isLoading } = useSWR(`https://openlibrary.org/works/${workId}.json`);

  if (isLoading) {
    return null;
  } else {
    if(error){
        return <Error statusCode={404} />
    } else {
        if(data){
            return (
                <>
                      <PageHeader text={data.title} />
                      <BookDetails book={data} workId={workId} /><br />
                </>
              );
        }else{
            return <Error statusCode={404} />
        }
    }
  }
}