function getJSONP(url,callback,img_num) 
{
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = function() 
    {
        if (xmlhttp.readyState == 4)
        {
            if(xmlhttp.status == 200) 
            {
                var obj = JSON.parse(xmlhttp.responseText);
                //console.log(img_num);
                callback(obj,img_num)
            }
        }
    }.bind(img_num);
    xmlhttp.send(null);
}

function display_image(img,img_num)
{
    var id = "crd_back_" + img_num;
    var  holder = document.getElementById(id);
    if (holder.childElementCount < 1)
    {
        console.log(img_num);
        var elem = document.createElement("img");
        elem.src = img;   
        holder.appendChild(elem);
    }

}

function display_back(img_num)
{
    var id = "crd_front_" + img_num;
    var  holder = document.getElementById(id);
    if (holder.childElementCount < 1)
    {
        var elem = document.createElement("img");
        elem.src = "./res/img/crd_back.png";   
        holder.appendChild(elem);
    }
    
}

function process_card(card,img_num)
{
    var img = card.card_images[0]["image_url"];
    display_image(img,img_num);
    setTimeout(function()
    {
        console.log(img_num) 
        rotate_card(img_num,true);
        if(img_num == 2)
        {
            document.getElementById("crd_back").addEventListener("click",flip_back);
        }
    }.bind(img_num), 750);  
}

function remove_cards()
{
    console.log("removing cards");
    document.getElementById("crd_front_1").innerHTML = '';
    document.getElementById("crd_back_1").innerHTML = '';
    document.getElementById("crd_front_2").innerHTML = '';
    document.getElementById("crd_back_2").innerHTML = '';

    rotate_card(1,false);
    rotate_card(2,false);
}

function rotate_card(img_num,face)
{
    var selector = ".card_" + img_num;
    console.log(selector);
    document.querySelector(selector).classList.toggle('is-flipped',face);
}

function draw()
{
    document.getElementById("crd_back").removeEventListener("click",flip_back);

    document.querySelector('.card').classList.toggle('is-flipped',true);

    // Clear the container of cards 
    

    var url = "https://db.ygoprodeck.com/api/v6/randomcard.php";
    var callback = process_card;

    // get the cards
    getJSONP(url,callback,1); // card 1 
    getJSONP(url,callback,2); // card 2
    
    display_back(1);
    display_back(2);
    
}

function flip_back()
{

    remove_cards();
    console.log("back flip");
    document.querySelector('.card').classList.toggle('is-flipped',false);

}

function setup()
{
    document.getElementById("crd_front").addEventListener("click",draw);
    document.getElementById("crd_back").addEventListener("click",flip_back);

}

// ""Entry Point""
setup();

