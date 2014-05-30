Seed Guardian
=============

See it in action at http://github.com/SeedGuardian

- [What is it?](#what-is-it)
- [Backlog](#Backlog)
- [Libraries](#Libraries)

##what-is-it
This software shares your electrum 12 words seed in 15 words shares. If you share your seed in 3 shares with a threshold of 2, you need 2 shares to reconstruct your seed, so you could lose one share, and somebody finding one share can't reconstruct your seed.

##Backlog
 1. Generation of some bitcoin addresses from the seed
    This software allows to make a very secure cold storage, but at the moment, use of electrum is needed to get one address to store your bitcoins. Generation of one/many addresses would allow to generate a secure cold storage using only Seed Guardian. I think the following library could do the job : https://github.com/carbonwallet/carbonwallet.github.io/blob/master/app/extjs/electrum.js
 2. Online detection
    To make a very secure cold storage, you need to be offline. It would be nice if this page could prevent when use of this software is done online.

##Libraries
This software is built using following libraries
 - angular.js
 - bootstrap.css
 - secrets.js
 - mnemonic.js