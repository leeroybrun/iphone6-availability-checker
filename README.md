iphone6-availability-checker
============================

Node.js command line app to check for availability of iPhone 6 in Apple Stores.

2 ways to check availability :

- cms.js : one time checker
- cron.js : recuring cron checker

They have the sames options :

```node cmd.js --model iphone6 --size 128 --color grey --countryCode CH --locale fr_CH```

Help :

```node cmd.js --help```

## Cron

If you want the cron to send you an email when your model is available, you need to copy the "config/default.json" file to "config/custom.json" and the edit the "email" section (don't forget to change "enabled" to `true` !).