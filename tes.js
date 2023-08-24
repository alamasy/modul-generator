const fs = require("fs");

const data = {
    name: "John",
    age: 30,
    city: "New York",
};

const jsonData = JSON.stringify(data);

fs.writeFile("data.json", jsonData, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Data written to file successfully!");
    }
});
