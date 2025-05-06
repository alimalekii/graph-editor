import searchIcon from 'src/assets/magnifier.svg'

const SearchIcon = ({ show }: { show: boolean }) => {
  return show ? (
    <div className='bdm-header__search'>
      <input
        type='text'
        className='bdm-header__search__input'
        placeholder='Search your environment ...'
      />
      <span className='bdm-header__search__icon'>
        <img src={searchIcon} alt='search' loading='lazy' width={14} height={14} />
      </span>
    </div>
  ) : null
}

export default SearchIcon
