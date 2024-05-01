/*
  Tracks number of failed consecutive elections
*/
export default class ElectionTracker {
  failedElections: number;

  constructor() {
    this.failedElections = 0;
  }
}
