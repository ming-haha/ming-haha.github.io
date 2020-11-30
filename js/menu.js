(function(){
    var divSwitch = $('.menu-switch');
    var ulNav = $('.menu-nav');

    function toggleNav(){
        divSwitch.classList.toggle('menu-switch-extend');
        ulNav.classList.toggle('menu-nav-extend');
    }
    divSwitch.onclick = toggleNav;
    ulNav.addEventListener('click', function(){
        toggleNav()
    })
})()
