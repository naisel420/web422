import useSWR from "swr";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import Error from "next/error";

export default function BookCard({ workId }) {

    const { data, error, isLoading } = useSWR(`https://openlibrary.org/works/${workId}.json`);

    if (isLoading) {
        return null;
    } else {
        if (error) {
            return <Error statusCode={404} />
        } else {
            if (data) {
                return (                      
                    <Card>
                        <Card.Img variant="top"
                            onError={(event) => {
                                event.target.onerror = null; 
                                event.target.src =
                                    "https://placehold.co/400x600?text=Cover+Not+Available";
                            }}
                            className="img-fluid w-100"
                            src={`https://covers.openlibrary.org/b/id/${data?.covers?.[0]}-M.jpg`}
                            alt="Listing Image"
                        />
                        <Card.Body>
                            <Card.Title>{data?.title || ""}</Card.Title>
                            <Card.Text>
                                <br /><strong>Published: </strong>{data?.first_publish_date || "N/A"}<br /><br />
                                <Button as={Link} href={`/works/${workId}`}  variant="outline-primary">View Book</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                );
            } else {
                return <Error statusCode={404} />
            }
        }
    }

}