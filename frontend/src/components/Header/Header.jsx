import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Button, Col } from 'reactstrap';
import { NavLink, useNavigate} from 'react-router-dom';
import logowithname from '../../assets/images/logo3.png';
import './header.css';
import { CSSTransition } from 'react-transition-group';
import axios from 'axios';



const nav__links = [
  {
    path: '/home',
    display: 'Home',
  },
  {
    path: '/about',
    display: 'About',
  },
  {
    path: '/offers',
    display: 'Offers',
  },
  {
    path: '/services',
    display: 'Services',
  },
  {
    path: '/ticket',
    display: 'Tickets',
  },
  {
    path: '/reports',
    display: 'Reports',
  },
];


const Header = () => {
  const headerref = useRef(null);
  const [isNavVisible, setNavVisibility] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  const stickyHeaderFunc = () => {
    if (window.scrollY > 80) {
      headerref.current.classList.add('sticky__header');
    } else {
      headerref.current.classList.remove('sticky__header');
    }
  };

  useEffect(() => {
    stickyHeaderFunc();

    const mediaQuery = window.matchMedia('(max-width: 700px)');
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    window.addEventListener('scroll', stickyHeaderFunc);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
      window.removeEventListener('scroll', stickyHeaderFunc);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true);
    } else {
      setIsSmallScreen(false);
    }
  };

  const toggleNav = () => {
    setNavVisibility(!isNavVisible);
  };

  const closeMobileMenu = () => {
    setNavVisibility(false);
  };

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  const navigateToHome = () => {
    // navigate to /Home
    navigate('/Home');
  };

  const handleLogout = () => {
    axios.post('http://127.0.0.1:5000/logout')
    .then(response => {
      alert("Successfully Logout");
      sessionStorage.clear();
      navigateToHome();
    })
    .catch(error => {
      // Handle errors from the backend (e.g., display an error message)
      console.error(error);
    });
  };
    
  return (
    <>
      <header className={`header ${isNavVisible ? 'mobile-menu-open' : ''}`} ref={headerref}>
        <Container>
          <Row>
            <div className="nav__wrapper d-flex align-items-center justify-content-between">
              {/* Logo */}
              <div className="logo">
                <img src={logowithname} alt="" />
              </div>

              {/* Menu */}
              <CSSTransition
                in={!isSmallScreen || isNavVisible}
                timeout={350}
                classNames="NavAnimation"
                unmountOnExit
              >
                <div className={`navigation ${isSmallScreen ? 'mobile-menu-open' : ''}`}>
                  <ul className="menu d-flex align-items-center gap-5">
                    {nav__links.map((item, index) => (
                      <li className="nav__item" key={index}>
                        <NavLink
                          to={item.path}
                          activeclassname="active__link"
                          onClick={() => {
                            closeMobileMenu();
                            scrollToTop(); // Scroll to the top of the page
                          }}
                        >
                          {item.display}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                  {/* Login and Register Buttons */}
                  {isSmallScreen && isNavVisible && (
                    <div className="nav__btns d-flex align-items-center gap-4">
                    {!token ? 
                    <Row>
                      <Col>
                      <Button className="btn primary__btn">
                        <NavLink to="/login" onClick={() => { closeMobileMenu(); scrollToTop(); }}>
                         Login
                        </NavLink>
                      </Button>
                      </Col>
                      <Col>
                    <Button className="btn primary__btn">
                      <NavLink to="/registered_user" onClick={() => { closeMobileMenu(); scrollToTop(); }}>
                        Register
                      </NavLink>
                    </Button>
                    </Col>
                    </Row>
                    :
                    <Row>
                      <Col>
                      <Button className="btn primary__btn">
                         <NavLink to="/home" onClick={() => { closeMobileMenu(); scrollToTop(); handleLogout(); }} >
                         Logout
                         </NavLink>
                      </Button>
                      </Col>
                      <Col>
                      <Button className="btn primary__btn">
                      <NavLink to="/User_profile" onClick={() => { closeMobileMenu(); scrollToTop(); }}>
                        profile
                      </NavLink>
                      </Button>
                      </Col>
                    </Row>
                    }
                    
                  </div>
                  )}
                </div>
              </CSSTransition>

              {/* Right-side buttons */}
              <div className="nav__right d-flex align-items-center gap-4">
                <button onClick={toggleNav} className="Menu">
                  ⏬
                </button>
                {/* Right-side buttons for non-mobile view */}
                {!isSmallScreen && (
                  <div className="nav__btns d-flex align-items-center gap-4">
                    {!token ? 
                    <Row>
                      <Col>
                      <Button className="btn primary__btn" >
                        <NavLink to="/login" onClick={() => { closeMobileMenu(); scrollToTop(); }}>
                         Login
                        </NavLink>
                      </Button>
                      </Col>
                      <Col>
                      <Button className="btn primary__btn">
                        <NavLink to="/registered_user" onClick={() => { closeMobileMenu(); scrollToTop(); }}>
                          Register
                        </NavLink>
                      </Button>
                      </Col>
                    
                    </Row>
                    :
                    <Row>
                      <Col>
                      <Button className="btn primary__btn">
                         <NavLink to="/home" onClick={() => { closeMobileMenu(); scrollToTop(); handleLogout(); }} >
                         Logout
                         </NavLink>
                      </Button>
                      </Col>
                      <Col>
                      <Button className="btn primary__btn">
                      <NavLink to="/User_profile" onClick={() => { closeMobileMenu(); scrollToTop(); }}>
                        profile
                      </NavLink>
                      </Button>
                      </Col>
                    </Row>
                    }
                    
                  </div>
                )}
              </div>
            </div>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;
