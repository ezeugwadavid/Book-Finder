//This serves as the main parent component, child component includes the Search component and the BookCard component
import React, { useEffect, useState } from "react";
import styles from "./home.module.scss";
import Search from "../search/search";
import LeftButton from "../../assets/leftbtn.svg";
import RightButton from "../../assets/rightbtn.svg";
import BookCard from "../book-card/bookCard";
import ReactPaginate from "react-paginate";
import {
  BookObject,
  GoogleBookApiResponse,
} from "../../interfaces/bookinterface";
import { searchBooks } from "../../services/apis";
import withHome from "./homeHoc";
import { debounce } from "../../utils/debounce";

const EnhancedBookCard = withHome(BookCard);

const Home: React.FC = () => {
  const [bookid, setBookId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [books, setBooks] = useState<BookObject[]>([]);
  const [itemOffset, setItemOffset] = useState<number>(0);
  const [currentItems, setCurrentItems] = useState<BookObject[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const itemsPerPage = 10;

  // gets called when the previous(left arrow) or next(right arrow) button is clicked from the paginated controls
  const handlePageClick = (event: { selected: number }) => {
    const newOffset = (event.selected * itemsPerPage) % books.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected + 1);
  };

  const fetchBooks = async (query: string) => {
    const results = await searchBooks(query.trim());
    const formattedBooks: BookObject[] = results.map(
      (book: GoogleBookApiResponse) => ({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors || ["Unknown"],
        publishedDate: book.volumeInfo.publishedDate || "N/A",
        description: book.volumeInfo.description || "No description available",
        publisher: book.volumeInfo.publisher || "Unknown",
        thumbnail:
          book.volumeInfo.imageLinks?.thumbnail ||
          "https://via.placeholder.com/150",
      })
    );
    setBooks(formattedBooks);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const toggle = (id: string) => {
    setBookId(id);
    setIsOpen(!isOpen);
  };

  // Debounce effect for search input
  useEffect(() => {
    const debouncedFetch = debounce(fetchBooks, 1000);
    if (searchQuery) {
      debouncedFetch(searchQuery);
    }

    // Clean up the debounce on unmount
    return () => {
      debouncedFetch.cancel?.();
    };
  }, [searchQuery]);

  //Does pagination calculations
  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(books.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(books.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, books]);

  return (
    <div className={styles.homecontainer}>
      <div className={styles.searchcontainer}>
        <Search handleSearch={handleSearch} />
      </div>
      <div className={styles.bookscontainer}>
        {currentItems.map((book) => {
          const {
            id,
            title,
            authors,
            publishedDate,
            description,
            publisher,
            thumbnail,
          } = book;
          return (
            <div
              key={id}
              className={styles.bookitem}
              onClick={() => toggle(id)}
            >
              <EnhancedBookCard
                id={id}
                title={title}
                authors={authors}
                publishedDate={publishedDate}
                description={description}
                publisher={publisher}
                thumbnail={thumbnail}
                isOpen={isOpen}
                bookid={bookid}
              />
            </div>
          );
        })}
      </div>
      {books.length > 0 && (
        <div className={styles.paginatecontainer}>
          <ReactPaginate
            breakLabel="..."
            nextLabel={
              <img className={styles.controlbtn} src={RightButton} alt="" />
            }
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={
              <img className={styles.controlbtn} src={LeftButton} alt="" />
            }
            renderOnZeroPageCount={null}
            containerClassName={styles.controls}
            pageLinkClassName={styles.pagelink}
            previousLinkClassName="prev"
            nextLinkClassName="prev"
            activeLinkClassName="highlight"
          />
          <div className={styles.currentpage}>
            page {currentPage} of {pageCount}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
