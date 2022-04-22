"use strict";

const { binaryInsert } = require("./binary-sort");

module.exports = (logSources, printer) => {
  const sortedLogSources = [];
  logSources.map((logSource, index) => {
    const log = logSource.pop();
    binaryInsert({ log, index }, sortedLogSources);
  });
  while (sortedLogSources[sortedLogSources.length-1]) {
    try {
      printer.print(sortedLogSources[sortedLogSources.length-1].log);
    } catch (error) {
      console.log(error);
      return;
    }
    sortedLogSources[sortedLogSources.length-1].log = logSources[sortedLogSources[sortedLogSources.length-1].index].pop();
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
