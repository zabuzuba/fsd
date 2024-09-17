1) How would you implement a WebSocket connection in a React component for realtime data fetching?
   
Ans) WebSocket connection in React: Implement the `useEffect` hook to establish a WebSocket connection. Define event handlers like `onmessage` to receive data, `onerror` for error handling, and `onclose` for closing the connection. Clean up the connection using `socket.close()` in the cleanup function.

2) Describe how you would create a responsive table to display stock prices.
   
Ans) Responsive table for stock prices: Use a standard HTML table with CSS media queries to ensure the table adjusts to different screen sizes. Limit the number of rows displayed for better performance.

3) How can you implement a search bar to filter stocks based on the user's input?
   
Ans) Search bar to filter stocks: Implement a controlled input element using `useState` for the search term. Filter the stock data based on user input by matching stock symbols, then dynamically display the filtered results.

4) Explain the steps for handling connection errors and displaying appropriate messages to the user.

Ans) Handling connection errors: Use WebSocket's `onerror` event to catch errors and display appropriate error messages. Also, handle the `onclose` event to show a "connection closed" message. Reset errors when data flows successfully.

5) How would you ensure the efficient updating of stock prices in the UI without performance degradation?
    
Ans) Efficient UI updates: Use `useState` and `useMemo` hooks to efficiently manage state and filter data. Limit the data updates (e.g., keep only the latest 10 stocks) to avoid memory leaks and ensure smooth UI rendering.
