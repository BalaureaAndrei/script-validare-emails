const receivedTxt = `

`;

// NO EDITING

const container = document.getElementById("container");
let regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");
var specialChars = "!@#$^&%*()+=-[]/{}|:<>?,.";
const emails = [];
let yahooMails = [];

const validatorForTxt = (txt) => {
  let email = "";
  for (let index = 0; index < txt.length; index++) {
    email = email + txt[index];

    if (
      txt[index].includes(" ") ||
      txt[index].includes('"') ||
      txt[index].includes("'") ||
      txt[index].includes(";") ||
      txt[index].includes("<") ||
      txt[index].includes(">") ||
      txt[index].includes("/") ||
      txt[index].includes("`") ||
      txt[index].includes("\n") ||
      (txt[index - 1] === "." && txt[index - 2] === ".") ||
      (txt[index - 2] === "." && txt[index - 3] === ".")
    ) {
      if (regex.test(email)) {
        const validated = email
          .replace(">", "")
          .replace("/", "")
          .replace(";", "")
          .replace("'", "")
          .replace('"', "")
          .replace("`", "")
          .replace("\n", "")
          .replace(" ", "")
          .replace(",", "")
          .replace(/[`~!#$%^&*()|+=?;:'",<>\{\}\[\]\\\/]Â/gi, "");
        
        if (validated.includes("@yahoo.") || validated.includes("@ymail.")) {
          yahooMails.push(validated);
        }
				else {
					emails.push(validated);
				}
      }

      email = "";
      continue;
    }
  }
};
validatorForTxt(receivedTxt);

let csvContent = "data:text/csv;charset=utf-8,";

emails.forEach(function (mail) {
  csvContent += mail + "\r\n";
});

let csvContentYahoo = "data:text/csv;charset=utf-8,";

yahooMails.forEach(function (mail) {
  csvContentYahoo += mail + "\r\n";
});

var encodedUriAll = encodeURI(csvContent);
var encodedUriYahoo = encodeURI(csvContentYahoo);
console.log("All Emails", encodedUriAll);
console.log("Yahoo Emails", encodedUriYahoo);

var link = document.createElement("a");
link.setAttribute("href", encodedUriAll);
link.setAttribute("download", "emails.csv");
document.body.appendChild(link)
; // Required for FF
link.click();

var link2 = document.createElement("a");
link2.setAttribute("href", encodedUriYahoo);
link2.setAttribute("download", "yahoo.csv");
document.body.appendChild(link2); // Required for FF
link2.click();
