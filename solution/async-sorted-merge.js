"use strict";

const { binaryInsert } = require("./binary-sort");

module.exports = async (logSources, printer) => {
  const sortedLogSources = [];
  const logEntries = await Promise.all(logSources.map(source => source.popAsync()));
  logEntries.map((log, index) => {
    binaryInsert({ log, index }, sortedLogSources);
  });
  while (sortedLogSources[sortedLogSources.length-1]) {
    try {
      printer.print(sortedLogSources[sortedLogSources.length-1].log);
    } catch (error) {
      console.log(error);
      return;
    }
    sortedLogSources[sortedLogSources.length-1].log = await logSources[sortedLogSources[sortedLogSources.length-1].index].popAsync();
    if (sortedLogSources[sortedLogSources.length-1].log) {
      const updatedLogSource = sortedLogSources.pop();
      binaryInsert(updatedLogSource, sortedLogSources);
    }
    else {
      sortedLogSources.pop();
    }
  }
  printer.done();
};
