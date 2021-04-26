const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Home", sName:"Taniya Khangura"});
    }
   render(sPage) {
       const oJson = fetch("https://ux308final-3813f-default-rtdb.firebaseio.com/meals.json").json();
       console.log(oJson);
       let sResult = "<h1>Diwali Craft Kits</h1>";
       Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            console.log(oEntity);
            oEntity.id = key;
            sResult += `
            <h2>${oEntity.title} </h2> 
            <p><img src="${oEntity.featured_image}" alt="${oEntity.title}"</p>
            <p>${oEntity.price}</p>
            <p>${oEntity.full_description}</p>
            <p>Deadline to Order: ${oEntity.date}</p>
            <p>This Kit Includes: ${oEntity.materials}</p>
            <form action="https://ux308.herokuapp.com/payment" method="post">
            <input type="hidden" name="title" value="${oEntity.title}" />
            <input type="hidden" name="price" value="${oEntity.price}" />
            <input type="tel" placeholder="Enter your number" name="telephone"/>
            <button type="Submit">Order now</button>
            </form>
            `;
       });
       return sResult;
    }
}