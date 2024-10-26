import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './src/components/home/home';
import * as api from './src/services/apis'; 

jest.mock('./src/services/apis'); // Mock the entire module

describe('Home', () => {
  it('fetches and displays books based on search query', async () => {
    // Define mock data
    const mockData = [
      {
        id: '1',
        volumeInfo: {
          title: 'Mock Book Title',
          authors: ['Author One'],
          publishedDate: '2023',
          description: 'Sample description',
          publisher: 'Mock Publisher',
          imageLinks: {
            thumbnail: 'https://via.placeholder.com/150',
          },
        },
      },
    ];

    // Mock searchBooks function to return mockData
    (api.searchBooks as jest.Mock).mockResolvedValueOnce(mockData);

    // Render the component
    render(<Home />);

    // Simulate typing in the input
    const input = screen.getByPlaceholderText('Search book');
    fireEvent.change(input, { target: { value: 'Mock Book' } });

    // Wait for results to appear
    await waitFor(() => {
      expect(screen.getByText('Mock Book Title')).toBeInTheDocument();
    });

    // Verify searchBooks was called with the correct query
    expect(api.searchBooks).toHaveBeenCalledWith('Mock Book');
  });
});
