/**
 * Created by Mathias on 16-11-2016.
 */

var skins = [
    [{skinName:"Grey", imageLnk:"http://i.imgur.com/2q0MyCk.png", sharkLnk:"http://i.imgur.com/HFLFbV4.gif", price: "Use"}],
    [{skinName:"Yellow", imageLnk:"http://i.imgur.com/Jthev0W.png", sharkLnk:"http://i.imgur.com/rUM83Ag.gif", price: "Use"}],
    [{skinName:"Red", imageLnk:"http://i.imgur.com/144SM1L.png", sharkLnk:"http://i.imgur.com/sqd1jeV.gif", price: "Use"}],
    [{skinName:"Green", imageLnk:"http://i.imgur.com/wKWmD2r.png", sharkLnk:"http://i.imgur.com/GH6p6fU.gif", price: "Use"}],
    [{skinName:"Cow", imageLnk:"http://i.imgur.com/JxVLmFs.png", sharkLnk:"http://i.imgur.com/XR3IDQC.gif", price: "50"}],
    [{skinName:"Tiger", imageLnk:"http://i.imgur.com/Ct2ySac.png", sharkLnk:"http://i.imgur.com/Ql8KXrp.gif", price: "200"}],
    [{skinName:"Panda", imageLnk:"http://i.imgur.com/AyKDuc9.jpg?1", sharkLnk:"http://i.imgur.com/XMrIEVI.gif", price: "50"}]
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