# delay5

This repo was created to investigate https://github.com/ChainSafe/js-libp2p-yamux/issues/72

## Use

### Install

`npm install`

### Test

`npm test`

There are 3 tests with timeout set to 1 second.

The output should look like:

```
 ❯ index.test.ts (3) 1136ms
   ❯ delay5 (3) 1136ms
     ✓ passes with 0 delay
     × passes with 5 delay 1003ms
     ✓ passes with 100 delay
```