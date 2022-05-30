window.onload = function(){
    function c(){
        var w = document.documentElement.clientWidth;
        var n = 20*(w/450);
        if(n>20){
            n = 20;
        }else{
            n = 20*(w/450);
        }
        document.documentElement.style.fontSize = n + 'px';
    }
    c();
    window.addEventListener('resize',c);
}