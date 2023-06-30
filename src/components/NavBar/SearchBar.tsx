import { HiOutlineSearch } from 'react-icons/hi';
import { useState } from 'react';
import { MdClose } from 'react-icons/md';
  
function SearchBar() {

    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearchOpen = () => {
        setSearchOpen(true);
      };
      
      const handleSearchClose = () => {
        setSearchOpen(false);
        setSearchQuery('');
      };
      
      const handleSearchQueryChange = (event:any) => {
        setSearchQuery(event.target.value);
      };
      
      const handleSearchSubmit = (event:any) => {
        event.preventDefault();
        // Handle the search query submission
        // You can perform search functionality or navigate to a search results page
      };

    return(
        <div className="flex items-center">
  {searchOpen ? (
    <form onSubmit={handleSearchSubmit} className="relative">
      <input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchQueryChange}
        className="py-2 px-6 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button
        type="button"
        onClick={handleSearchClose}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        <MdClose className="w-6 h-6 p-1" />
      </button>
    </form>
  ) : (
    <button
      type="button"
      onClick={handleSearchOpen}
      className="flex items-center justify-center p-2 ml-4 text-gray-500 hover:text-gray-700 focus:outline-none"
    >
      <HiOutlineSearch className="w-5 h-5" />
    </button>
  )}
</div>

    )
    
}


export default SearchBar;