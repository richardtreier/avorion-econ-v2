<h3 align="center">Avorion Economic Planner v2</h3>
  <p align="center">
    Factories, Goods, Processing Power, Supply Chains
    <br />
    <a href="https://richardtreier.github.io/avorion-econ-v2" target="_blank">Visit Live Version</a>
  </p>
</div>

## What is this?

[Avorion](https://steamcommunity.com/app/445220) is a space sandbox game with both builder elements and roguelinke elements. It used to boast a simulated economy, space stations and supply chains, which have been largely reduced with Avorions recent update of 2.0.

This tool takes the in-game lua files of 1.3.8, which is still available through steam betas, to help create factory supply chains, navigating the otherwise hard-to-find in-game information.

This is a fork of [Omnicrola/avorion-econ](https://github.com/Omnicrola/avorion-econ) / [Live Version](https://omnicrola.github.io/avorion-econ/). This version has been rewritten in SvelteKit 1 with added features.

## Features

- Factory Planner showing total production amounts
- Production Capacity requirements for optimal production speeds
- Work top down or bottom up in scaling up your business empire
- Find both goods and production facilities, which can often diverge in name

## Development

Requires Node 20

The following launches a Dev Server at http://localhost:5173.

```shell script
# Requires Bash, Git Bash or WSL
npm ci && npm run dev
```

## Releasing

The main branch is automatically deployed to GitHub pages.

## License

MIT License. See [LICENSE](./LICENSE)
