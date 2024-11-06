//here is where I define interfaces used in the app
export interface BookObject {
  id: string;
  title: string;
  authors: string[];
  publishedDate: string;
  description: string;
  publisher: string;
  thumbnail: string;
  isOpen: boolean;
  bookid: string;
}

export interface GoogleBookApiResponse {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate: string;
    description: string;
    publisher: string;
    imageLinks: {
      thumbnail: string;
    };
  };
}

export interface BookSearchProps {
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
