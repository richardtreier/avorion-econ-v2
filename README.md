<h3 align="center">Avorion Economic Planner v2</h3>
  <p align="center">
    Avorion Factory Bill of Material tool.
    <br />
    <a href="https://richardtreier.github.io/avorion-econ-v2">View Live Version</a> | 
    <a href="https://github.com/richardtreier/avorion-econ-v2/issues">Report Bug</a>
  </p>
</div>

## What is this?

Avorion is a Sandbox game with a simulated economy, space stations with supply chains.

This tool takes the in-game lua files for goods and factories and makes the data accessible.

Visit the live version [here](https://richardtreier.github.io/avorion-econ-v2/).

This is based on [Omnicrola/avorion-econ](https://github.com/Omnicrola/avorion-econ) / [Live Version](https://omnicrola.github.io/avorion-econ/. This version is a rewrite in SvelteKit with a few added features.

## Features

- Plan your Avorion factory supply chains
- Loop up factory assembly block / production capability requirements
- Manually or automatically fill your supply chain
- Search by both goods and factory names, which sometimes diverge

## Development

Node 20

The following launches a SvelteKit Dev Server at http://localhost:3000.

```shell script
# Requires Bash, Git Bash or WSL
npm ci && npm run dev
```

## Support

This tool was developed for Avorion 1.3.8. As many sandbox and automation features were gutted in the Avorion 2.0 update, this tool remains on 1.3.8.

## Deployment

The main branch is automatically deployed to GitHub pages.

## License

MIT License. See [LICENSE](./LICENSE)
