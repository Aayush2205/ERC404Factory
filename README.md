
# ERC404Factory

## Introduction

ERC-404 is an experimental, mixed ERC-20 / ERC-721 implementation with native liquidity and fractionalization. While these two standards are not designed to be mixed, this implementation strives to do so in as robust a manner as possible while minimizing tradeoffs.

In its current implementation, ERC-404 effectively isolates ERC-20 / ERC-721 standard logic or introduces pathing where possible.

Pathing could best be described as a lossy encoding scheme in which token amount data and ids occupy shared space under the assumption that negligible token transfers occupying id space do not or do not need to occur.

Integrating protocols should ideally confirm these paths by checking that submitted parameters are below the token id range or above.

This iteration of ERC-404 specifically aims to address common use-cases and define better interfaces for standardization, that reduce or remove conflicts with existing ERC-20 / ERC-721 consensus.

This standard is entirely experimental and unaudited, while testing has been conducted in an effort to ensure execution is as accurate as possible.

The nature of overlapping standards, however, does imply that integrating protocols will not fully understand their mixed function.


## Development

### To start frontend

```
cd frontend

```
Install dependencies

```
npm i
```
To start server

```
npm start
```

## Contracts

### ERC404Factory.sol 

Smart Contract to call the BaseERC404 and to deploy it with the required inputs. 

### MinimalERC404.sol 

Smart Contract for my ERC404 token.


