/**
 * Created by Mathias on 16-11-2016.
 */

var skins = [
    [{skinName:"Grey", imageLnk:"http://i.imgur.com/2q0MyCk.png", sharkLnk:"http://i.imgur.com/5Kfk8Ln.png", price: "Use"}],
    [{skinName:"Yellow", imageLnk:"http://i.imgur.com/Jthev0W.png", sharkLnk:"http://i.imgur.com/N6OI7Uo.png", price: "Use"}],
    [{skinName:"Red", imageLnk:"http://i.imgur.com/144SM1L.png", sharkLnk:"http://i.imgur.com/QeQUcf2.png", price: "Use"}],
    [{skinName:"Green", imageLnk:"http://i.imgur.com/wKWmD2r.png", sharkLnk:"http://i.imgur.com/IHlbXGj.png", price: "Use"}],
    [{skinName:"Turtle", imageLnk:"http://i.imgur.com/U2EktdE.png", sharkLnk:"http://i.imgur.com/iMlni6J.jpg", price: "50"}],
    [{skinName:"Tiger", imageLnk:"http://i.imgur.com/Ct2ySac.png", sharkLnk:"http://i.imgur.com/iMlni6J.jpg", price: "200"}],
    [{skinName:"Cow", imageLnk:"http://i.imgur.com/JxVLmFs.png", sharkLnk:"http://i.imgur.com/iMlni6J.jpg", price: "300"}]
    ];




window.onload = function(){

    //uit database halen welke shark je hebt geactiveerd.


    skins.forEach(function(skin){

        var skinObject = skin[0];

        var item = document.createElement("div");
        var moneyAImg = document.createElement("div");
        var img = document.createElement("img");
        var money = document.createElement("span");
        var title = document.createElement("h2");

        item.setAttribute("class", "item");
        moneyAImg.setAttribute("class", "moneyAImg");

        title.innerHTML = skinObject.skinName;
        if(skinObject.price != "Use"){
            money.innerHTML = '<button>'+ "<img src='http://i.imgur.com/Yos3Lrc.png'></a>" + " " + skinObject.price + '</button>';
        }else {
            money.innerHTML = '<button>' + skinObject.price + '</button>';
        }
        img.src = skinObject.imageLnk;
        img.onmouseover = function(){
            img.src = skinObject.sharkLnk;
        };
        img.onmouseout = function () {
            img.src = skinObject.imageLnk;
        };



        item.appendChild(title);
        item.appendChild(moneyAImg);
        moneyAImg.appendChild(img);
        moneyAImg.appendChild(money);

        document.getElementsByClassName("items")[0].appendChild(item);



        money.onclick = function () {
            console.log("You bought this shark: " + skinObject.skinName);
            console.log(skin);
        };



    });



};