# SmartFormatDate

Just a fun function that ive made.
not the best but not the worst.

To get the JS file go to **compiled**.
For the TS file go to **src**.

# Usage:

**Supported languages**

  English: ```en-US```\
  Swedish: ```sv-EU```\
  Norwegian: ```no-EU```\
  Danish: ```dk-EU```\
  Finnish: ```fi-EU```\
  German: ```de-EU```\

**SmartDate**

```javascript
let date = new Date() // Gets current date, if you want a different date then put an string. Example: Date("2023-1-1")
let date_format = new SmartFormat(date,"en-US","long").SmartDate() // Returns a string

console.log(date_format) // Expected Output: Today
```
