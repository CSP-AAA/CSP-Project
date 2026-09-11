const TOR = require("../models/TOR");
const { isDeepStrictEqual } = require("node:util");

async function create(data) {
  return TOR.create(data);
}

async function findAll() {
  return TOR.find().sort({ publishedAt: -1 });
}

async function findById(id) {
  return TOR.findById(id);
}

async function update(id, data) {
  return TOR.findByIdAndUpdate(id, data, {
    returnDocument: "after",
    runValidators: true,
  });
}

async function remove(id) {
  return TOR.findByIdAndDelete(id);
}

function key({ refId, source }) {
  return `${source}:${refId}`;
}

async function saveChanged(tors) {
  const summary = { created: 0, updated: 0, unchanged: 0 };
  const uniqueTors = [...new Map(tors.map((tor) => [key(tor), tor])).values()];
  if (!uniqueTors.length) return summary;

  const existing = await TOR.find({
    refId: { $in: uniqueTors.map((tor) => tor.refId) },
    source: { $in: uniqueTors.map((tor) => tor.source) },
  }).lean();
  const byKey = new Map(existing.map((tor) => [key(tor), tor]));
  const writes = [];

  for (const tor of uniqueTors) {
    const current = byKey.get(key(tor));
    if (!current) {
      summary.created++;
      writes.push({ insertOne: { document: tor } });
    } else if (Object.keys(tor).some((field) => !isDeepStrictEqual(current[field], tor[field]))) {
      summary.updated++;
      writes.push({ updateOne: { filter: { _id: current._id }, update: { $set: tor } } });
    } else {
      summary.unchanged++;
    }
  }

  if (writes.length) await TOR.bulkWrite(writes);
  return summary;
}

module.exports = { create, findAll, findById, remove, update, saveChanged };
