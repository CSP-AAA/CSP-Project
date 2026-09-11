const { readdirSync } = require("node:fs");
const { join } = require("node:path");
const torRepository = require("../repositories/torRepository");

const apiDirectory = join(__dirname, "../services/tor/api");

// Adding an API means adding api/<name>/fetch.js and adapter.js; no registry edit required.
function sources() {
  return readdirSync(apiDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({
      name: entry.name,
      fetcher: require(join(apiDirectory, entry.name, "fetch")),
      adapter: require(join(apiDirectory, entry.name, "adapter")),
    }));
}

async function save(tors) {
  let saved = 0;
  for (const tor of tors) {
    try {
      await torRepository.upsertByRefId(tor.refId, tor);
      saved++;
    } catch (error) {
      console.error(`Error saving TOR ${tor.refId}:`, error.message);
    }
  }
  return saved;
}

// Fetch raw records, adapt them to the TOR schema, then persist idempotently by refId.
async function syncSource(name) {
  const source = sources().find((candidate) => candidate.name === name);
  if (!source) throw new Error(`Unknown API source: ${name}`);
  const result = await source.fetcher.fetch();
  const tors = source.adapter.adapt(result.rows);
  return {
    ...(result.metadata || {}),
    fetched: result.rows.length,
    matched: tors.length,
    method: source.fetcher.method,
    saved: await save(tors),
    source: source.fetcher.source,
  };
}

async function syncAPI() {
  // Run every discovered source independently but wait for the complete sync cycle.
  return Promise.all(sources().map(({ name }) => syncSource(name)));
}

module.exports = { sources, syncAPI, syncSource };
