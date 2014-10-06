iphone6-availability-checker
============================

Node.js command line app to check for availability of iPhone 6 in Apple Stores.

Data is gathered from https://reserve.cdn-apple.com/COUNTRYCODE/LOCALE/reserve/iPhone/availability.

2 ways to check availability :

- `cms.js` : one time checker
- `cron.js` : recuring cron checker

`cmd.js` and `cron.js` have the sames options :

```
  Options:

    -h, --help                        output usage information
    -V, --version                     output the version number
    -m, --model [model]               Model (iphone6/iphone6plus)
    -s, --size [size]                 Size (16/64/128)
    -c, --color [color]               Color (grey/silver/gold)
    -cc, --countryCode [countryCode]  Country code (ex: CH, US, ...)
    -l, --locale [locale]             Locale code (ex: fr_CH, en_US, ...)
```

Example :

```node cmd.js --model iphone6 --size 128 --color grey --countryCode CH --locale fr_CH```

Help :

```node cmd.js --help```

It has been tested with swiss locale and country code, I don't know if it works in other countries.

## Cron

If you want the cron to send you an email when your model is available, you need to copy the "config/default.json" file to "config/custom.json" and the edit the "email" section (don't forget to change "enabled" to `true` !).
