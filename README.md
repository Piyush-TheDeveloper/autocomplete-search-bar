# Autocomplete Search Bar using ReactJS

This project demonstrates an Autocomplete Search Bar implemented in ReactJS. The search bar dynamically fetches suggestions from an API, displays them based on the user's input, and provides efficient handling of caching and debouncing.

## 🔥 Key Features

- **Fetched Data from API:**
  - Dynamically retrieves data from the `https://dummyjson.com/products/search` API as users type in the search bar.
- **Stored Data and Displayed in Suggestions:**
  - Efficiently stores fetched data and shows matching suggestions as the user types.
- **OnBlur & OnFocus:**
  - `onFocus`: Displays suggestions when the search input gains focus (if there is input).
  - `onBlur`: Hides suggestions when the search input loses focus.
- **Debouncing for API Calls:**

  - Implemented debouncing to limit the frequency of API calls, preventing unnecessary requests between keystrokes.
  - ```javascript
    useEffect(() => {
      const timer = setTimeout(fetchData, 300); // Delays API call by 300ms

      return () => clearTimeout(timer); // Clears timeout on every keystroke
    }, [input]);
    ```

- **Cache for Redundant API Fetches:**

  - Cached search results to prevent redundant API calls and improve performance. If a search term has been fetched before, it uses the cached data instead of calling the API again.
  - ```javascript
    const fetchData = async () => {
      if (cache[input]) {
        setSearchResults(cache[input]); // Fetch from cache
        return;
      }

      const data = await fetch(
        `https://dummyjson.com/products/search?q=${input}`
      );
      const response = await data.json();
      setSearchResults(response?.products);
      setCache((prev) => ({ ...prev, [input]: response?.products })); // Save to cache
    };
    ```

## 🛠️ Tech Stack

- **ReactJS**: For building the UI and managing state.
- **JavaScript (ES6+)**: For handling logic such as debouncing, caching, and API calls.
- **CSS**: For basic styling of the search bar and suggestions dropdown.

## 📂 Project Structure

```
├── src
│ ├── App.js # Main App component with autocomplete logic
│ └── styles.css # CSS for styling the search bar and results
├── public
│ └── index.html # Basic HTML file
└── README.md # This README file
```

## 🚀 How It Works

- **Typing in the Search Bar:**
  - The search input captures the user's input and makes an API call with debouncing. Results are cached for future searches.
- **Debouncing:**
  - Debouncing limits the number of API calls by setting a delay between keystrokes. The API is called only after the user pauses typing for 300ms.
- **API Fetching and Caching:**
  - The app fetches matching products from the dummyjson API based on the user input. If the same input is typed again, it retrieves the results from the cache instead of making another API call.
- **Displaying Suggestions:**
  - Suggestions are displayed in a dropdown below the search bar. If no data matches, a "No Result found" message appears.
