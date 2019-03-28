exports.content = function() {
    return `
    <!DOCTYPE HTML>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Nav Exercise</title>             
    </head>
    <body>
        <div class="main-container">
            <input type="checkbox"/>
            <nav>
                <div class="nav-hamburguer-icon">
                    <span></span>
                    <span></span>
                    <span></span>
                    <ul class="primary-nav">   
                        <li class="nav-huge-image__item">
                            <img src="images/HUGE-white.png" alt="huge">
                        </li>
                        <li class="primary-nav__item">
                            <a href="#">Work</a>
                        </li>
                        <li class="primary-nav__item">
                            <div class="nav-arrow">
                                <span></span>
                                <span></span>
                            </div>  
                            <a href="#">About</a>
                            <ul class="secondary-nav">
                                <li class="secondary-nav__item"><a href="#">What we do</a></li>
                                <li class="secondary-nav__item"><a href="#">How we work</a></li>
                                <li class="secondary-nav__item"><a href="#">Leadership</a></li>
                            </ul>
                        </li>
                        <li class="primary-nav__item">
                            <div class="nav-arrow">
                                <span></span>
                                <span></span>
                            </div>
                            <a href="#">Careers</a>
                            <ul class="secondary-nav">
                                <li class="secondary-nav__item"><a href="#">Client Services</a></li>
                                <li class="secondary-nav__item"><a href="#">Creative</a></li>
                                <li class="secondary-nav__item"><a href="#">Motion & Media</a></li>
                                <li class="secondary-nav__item"><a href="#">Operations</a></li>
                                <li class="secondary-nav__item"><a href="#">People</a></li>
                                <li class="secondary-nav__item"><a href="#">Strategy</a></li>
                                <li class="secondary-nav__item"><a href="#">Technology</a></li>
                                <li class="secondary-nav__item"><a href="#">UX & Product Design</a></li>
                            </ul>
                        </li>
                        <li class="primary-nav__item">
                            <div class="nav-arrow">
                                <span></span>
                                <span></span>
                            </div>
                            <a href="#">Ideas</a>
                            <ul class="secondary-nav">
                                <li class="secondary-nav__item"><a href="#">Reports</a></li>
                                <li class="secondary-nav__item"><a href="#">Perspectives</a></li>
                                <li class="secondary-nav__item"><a href="#">Books</a></li>
                                <li class="secondary-nav__item"><a href="#">Videos</a></li>
                            </ul>
                        </li>
                        <li class="primary-nav__item">
                            <a href="#">News</a>
                        </li>
                        <li class="primary-nav__item">
                            <a href="#">Events</a>
                        </li>
                        <li class="primary-nav__item">
                            <div class="nav-arrow">
                                    <span></span>
                                    <span></span>
                                </div>
                            <a href="#">Contact</a>
                            <ul class="secondary-nav">
                                <li class="secondary-nav__item"><a href="#">Atlanta</a></li>
                                <li class="secondary-nav__item"><a href="#">Brooklyn</a></li>
                                <li class="secondary-nav__item"><a href="#">DC</a></li>
                                <li class="secondary-nav__item"><a href="#">London</a></li>
                                <li class="secondary-nav__item"><a href="#">Los Angeles</a></li>
                                <li class="secondary-nav__item"><a href="#">Oakland</a></li>
                                <li class="secondary-nav__item"><a href="#">Toronto</a></li>
                            </ul>
                        </li>
                    </ul>                    
                </div><!--
                <footer>
                        © 2018 Huge. All Rights Reserved.
                </footer>-->
            </nav>              
            <div class="main-content__container">
                <img class="desktop__image" src="images/background-image.jpg" alt="Get paid for giving a shit">                
                <h1 class="desktop-image__text">Get paid for giving a shit.</h1>
                <div class="lorem-text__container">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </div>
            </div>                           
        </div>
    </body>
    </html>`;
}