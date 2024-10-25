import React from "react";
import styles from "./search.module.scss";
import SearchIcon from "../../assets/searchicon.svg";
import { BookSearchProps } from "../../interfaces/bookinterface";

const Search: React.FC<BookSearchProps> = ({ handleSearch }) => {
  return (
    <div className={styles.searchcontainer}>
      <div className={styles.inputcontainer}>
        <input
          type="text"
          placeholder="Search book"
          className={styles.searchinput}
          onChange={handleSearch}
        />
        <div className={styles.searchcover}>
          <div className={styles.serachiconcontainer}>
            <img src={SearchIcon} className={styles.serachicon} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
