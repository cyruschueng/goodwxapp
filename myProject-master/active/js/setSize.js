 setSize();
    window.addEventListener("resize", setSize, false);
    window.addEventListener("orientationchange", setSize, false);
    function setSize() {
        var html = document.getElementsByTagName('html')[0];
        var width = html.getBoundingClientRect().width;
        html.style.fontSize = width / 3.75 + "px";
    }