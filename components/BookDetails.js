import { Container, Row, Col, Button } from "react-bootstrap";
import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import { useEffect, useState } from "react";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

export default function BookDetails({ book, workId, showFavouriteBtn = true }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  
  useEffect(() => {
    setShowAdded(favouritesList?.includes(workId));
  }, [favouritesList, workId]);

  
  async function favouritesClicked() {
    try {
      if (showAdded) {
        const updated = await removeFromFavourites(workId);
        setFavouritesList(updated);
        setShowAdded(false);
      } else {
        const updated = await addToFavourites(workId);
        setFavouritesList(updated);
        setShowAdded(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Container>
      <Row>
        <Col lg="4">
          <img
            onError={(event) => {
              event.target.onerror = null;
              event.target.src =
                "https://placehold.co/400x600?text=Cover+Not+Available";
            }}
            className="img-fluid w-100"
            src={`https://covers.openlibrary.org/b/id/${book?.covers?.[0]}-L.jpg`}
            alt="Listing Image"
          />
          <br />
          <br />
        </Col>
        <Col lg="8">
          <h3>{book.title}</h3>

          {book.description && (
            <p>
              {typeof book.description === "string"
                ? book.description
                : book.description.value}
            </p>
          )}

          {book.subject_people && (
            <>
              <br />
              <h5>Characters</h5>
              <div>{book.subject_people.join(", ")}</div>
            </>
          )}

          {book.subject_places && (
            <>
              <br />
              <h5>Settings</h5>
              <div>{book.subject_places.join(", ")}</div>
            </>
          )}

          {book.links && (
            <>
              <br />
              <h5>More Information</h5>
              {book.links.map((link, idx) => (
                <div key={idx}>
                  <a href={link.url} target="_blank">
                    {link.title}
                  </a>
                </div>
              ))}
            </>
          )}

          {showFavouriteBtn && (
            <>
              <br />
              <Button
                variant={showAdded ? "primary" : "outline-primary"}
                onClick={favouritesClicked}
              >
                + Favourite {showAdded && "( added )"}
              </Button>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}
