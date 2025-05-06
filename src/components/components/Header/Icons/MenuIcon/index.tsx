const MenuIcon = ({ show, toggleNavbar }: { show: boolean; toggleNavbar: () => void }) => {
  return show ? (
    <div className='bdm-header__menu-btn' onClick={toggleNavbar}>
      <span className='bdm-header__menu-btn__title'>منوی اصلی</span>

      <span className='bdm-header__menu-btn__icon'>
        <span className='bdm-header__menu-btn__icon__bar'></span>
        <span className='bdm-header__menu-btn__icon__bar'></span>
        <span className='bdm-header__menu-btn__icon__bar'></span>
      </span>
    </div>
  ) : null
}

export default MenuIcon
