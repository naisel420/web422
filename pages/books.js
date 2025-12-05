import PageHeader from '@/components/PageHeader';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Pagination, Table } from 'react-bootstrap';
import useSWR from 'swr';

export default function Books() {

  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState([]);
  const router = useRouter();

  const queryString = new URLSearchParams(router.query).toString();
  const { data, error } = useSWR(`https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`);

  useEffect(() => {
    if (data) {
      setPageData(data)
    }
  }, [data]);

  function previous(e) {
    if (page > 1) {
      setPage(prev => prev - 1);
    }
  }

  function next(e) {
    setPage(prev => prev + 1);
  }

  return (
    <>
      <PageHeader text={`Search Results`} subtext={Object.keys(router.query).map(key => router.query[key] ? <><strong><em>{key}</em></strong>: {router.query[key]} </> : '')} />

      <Table striped hover>
        <thead>
          <tr><th>Title</th><th>Published</th></tr>
        </thead>
        <tbody>
          {pageData?.docs?.map(book => (
            <tr key={book.key} onClick={() => { router.push(book.key) }}>
              <td>{book.title}</td>
              <td>{book.first_publish_year || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <br />
      <Pagination>
        <Pagination.Prev onClick={previous} />
        <Pagination.Item>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );

}