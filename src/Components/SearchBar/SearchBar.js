import React from 'react';

function SearchBar({ inputValue, handleSearch }) {
  return (
    <>
      <input
        className='searchbar-container'
        type='text'
        placeholder='Search Product Here'
        value={inputValue}
        onChange={handleSearch}
      />
    </>
  )
}

export default SearchBar