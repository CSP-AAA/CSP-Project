const { syncAPI, syncSource } = require("../../jobs/syncAPI");

async function syncSmeGp() {
  console.log("Starting SME-GP data sync...");
  const result = await syncSource("smeGp");
  console.log(
    `SME-GP sync complete. Saved/Updated ${result.saved} of ${result.matched} matched TORs.`,
  );
  return result;
}

async function syncBma() {
  console.log("Starting BMA e-GP2 data sync...");
  const result = await syncSource("bmaEgp2");
  console.log(
    `BMA e-GP2 sync complete. Saved/Updated ${result.saved} of ${result.matched} matched TORs.`,
  );
  return result;
}

async function syncAllSources() {
  console.log("Starting procurement data sync...");
  // Each source owns its fetch/mapping details; this layer only coordinates saving.
  const results = await syncAPI();
  const smeGpResult = results.find((result) => result.source === "SME-GP");
  const bmaEgp2Result = results.find((result) => result.source === "BMA-EGP2");

  console.log(
    `Procurement sync complete. Saved/Updated ${smeGpResult.saved} ${smeGpResult.source} TORs and ${bmaEgp2Result.saved} ${bmaEgp2Result.source} TORs.`,
  );
  return {
    fetched: smeGpResult.fetched,
    saved: smeGpResult.saved,
    matched: smeGpResult.matched,
    method: smeGpResult.method,
    source: smeGpResult.source,
    bmaEgp2BudgetYear: bmaEgp2Result.budgetYear,
    bmaEgp2Fetched: bmaEgp2Result.fetched,
    bmaEgp2Matched: bmaEgp2Result.matched,
    bmaEgp2Method: bmaEgp2Result.method,
    bmaEgp2Saved: bmaEgp2Result.saved,
    bmaEgp2Source: bmaEgp2Result.source,
  };
}

module.exports = { syncAllSources, syncSmeGp, syncBma };
