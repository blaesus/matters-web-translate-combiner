# Extractor of translation texts from Matters Web

For God knows why, people are tasked to manually extract translation texts from Matters's interface.

I think this is the wrong way to achieve such a goal. Instead, I took half an hour to compile required data, as someone who have never worked on this codebase, gladly.

### Implementation details

For God knows why, Matters have four translation systems.

#### 1. text.ts

About 60% of necessary data just lies in one file which is just a JavaScript object.

Use this command to extract translation data in CSV format.

```
let a = require('text.js')

console.info(Object.keys(a.TEXT.zh_hant).map(key => [a.TEXT.zh_hant[key], a.TEXT.zh_hans[key], a.TEXT.en[key]]).map(t => `${t[0]},${t[1]},${t[2]}`).join("\n"))
```

#### 2. payment.ts

English translation is missing for the Stripe error code. 

They are here: https://stripe.com/docs/error-codes

Run the following code in the console to extract error code and their corresponding messages.

```
Array.from(document.querySelectorAll(".ErrorCodes > div")).forEach(
div => {
	const dt = div.querySelector("dt")
	const dd = div.querySelector("dd")
	const code = dt.innerText;
	const text = dd.innerText;

	if (STRIPE_ERROR_MESSAGES.zh_hant[code]) {
		STRIPE_ERROR_MESSAGES.en[code] = text
	}
})
 
console.info(Object.keys(obj.zh_hant).map(key => `${key},${obj.zh_hant[key]},${obj.zh_hans[key]},${obj.en[key]}`).join('\n'))
```

#### 3. <Translate />

`<Translate />` tags are scattered around in the codebase.

Use `traverse.js` to extract them.
