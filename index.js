const fetch = require('sync-fetch');
const Page = require("./_layout/Default");

module.exports = class extends Page {
    constructor(){
        super({title:"Home", sName:"Richard Hildred"});
    }
   render(sPage) {
       const oJson = fetch("https://UX308App-default-rtdb.firebaseio.com/meals.json").json();
       console.log(oJson);
       let sResult = "<h1>Upcoming Popup Meals</h1>";
       Object.keys(oJson).map((key) => {
            const oEntity = oJson[key];
            console.log(oEntity);
            oEntity.id = key;
            sResult += `
            <h2>${oEntity.title}</h2>
            <p><img src="${oEntity.featured_image}" alt="${oEntity.title}"</p>
            <p>${oEntity.full_description}</p>
            <form action="http://localhost:3001/payment" method="post">
            <input type="hidden" value="${oEntity.title}" />
            <input type="tel" placeholder="Enter your number" />
            <button type="Submit">Order now</button>
            </form>
            `;
       });
       return sResult;
    }
}