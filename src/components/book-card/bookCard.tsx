import React from "react";
import styles from "./bookCard.module.scss";
import { BookObject } from "../../interfaces/bookinterface";
import { Collapse } from "reactstrap";

const BookCard: React.FC<BookObject> = ({
  id,
  title,
  authors,
  publishedDate,
  description,
  publisher,
  thumbnail,
  isOpen,
  bookid,
}) => {
  return (
    <div className={styles.cardcontainer}>
      <div className={styles.bookbox}>
        <div className={styles.bookimage}>
          <img src={thumbnail} className={styles.imgclass} alt="" />
        </div>
        <Collapse isOpen={id === bookid && isOpen}>
          <div className={styles.hiddendesc}>
            <div className={styles.description}>
              <span className={styles.desctitle}>Description:</span>{" "}
              {description}
            </div>
            <div className={styles.publisherinfo}>
              <span className={styles.pubtitle}>Publisher Information:</span>{" "}
              {publisher}
            </div>
          </div>
        </Collapse>
      </div>
      <div className={styles.bookinfo}>
        <div className={styles.booktitle}>
          <span className={styles.desctitle}>Title:</span> {title}
        </div>
        <div className={styles.bookauthor}>
          <span className={styles.desctitle}>Author:</span> {authors}
        </div>
        <div className={styles.pubdate}>
          <span className={styles.desctitle}>Publication Date:</span>{" "}
          {publishedDate}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
