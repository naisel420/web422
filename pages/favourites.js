import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { Col, Row } from "react-bootstrap";
import BookCard from "@/components/BookCard";
import PageHeader from "@/components/PageHeader";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  
  if (!favouritesList) return null;

  return (
    <>
      {favouritesList.length > 0 ? (
        <>
          <PageHeader
            text="Favourites"
            subtext="All your favourite books, in one place"
          />
          <Row className="gy-4">
            {favouritesList.map((workId) => (
              <Col lg={3} md={6} key={workId}>
                <BookCard workId={workId} />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <PageHeader
          text="Nothing Here"
          subtext="Try adding a book to the list"
        />
      )}
    </>
  );
}
