# SmartFormatDate
Made for making beautiful date strings for social medias, blogs, forums and much more!\
This is not meant to replace any existing modules 🙂.

Easy to use!

To get the JS file go to **compiled**.
For the TS file go to **src**.

**Supported languages**

> English: ```en-US```\
> Swedish: ```sv-EU```\
> Norwegian: ```no-EU```\
> Danish: ```dk-EU```\
> Finnish: ```fi-EU```\
> German: ```de-EU```

**Variables**

Date : Date Object\
language : string\
format : string [ "long" | "short" | "narrow" ]

# Usage:

**SmartDate**

```javascript
let date = new Date() // Gets current date, if you want a different date then put an string. Example: Date("2023-1-1")
let date_format = new SmartFormat(date,"en-US","long").SmartDate() // Returns a string

console.log(date_format)
```
```
Output: Today
```
