import { expect } from 'chai';
import * as wellUtils from './wellUtils';
import qpcrData from '../qpcr-data.json';

/* eslint-env jest */
describe('parsePosition', () => {
  let wellId;

  beforeEach(() => {
    wellId = '';
  });

  it('supports the given example data', () => {
    wellId = 'row:16||column:24';
    const position = wellUtils.parsePosition(wellId);

    expect(position).to.have.property('row', 16);
    expect(position).to.have.property('column', 24);
  });

  it('supports mismatched numbers of digits', () => {
    wellId = 'row:123||column:4';
    const position = wellUtils.parsePosition(wellId);

    expect(position).to.have.property('row', 123);
    expect(position).to.have.property('column', 4);
  });
});

describe('getDimensions', () => {
  let wells;

  describe('when given the example data', () => {
    beforeEach(() => {
      wells = wellUtils.parseQpcrData(qpcrData);
    });

    it('gets the correct dimensions', () => {
      const dimensions = wellUtils.getDimensions(wells);

      expect(dimensions).to.have.property('rows', 16);
      expect(dimensions).to.have.property('columns', 24);
    });
  });
});

describe('getThresholdCycle', () => {
  let cycles;

  describe('when a cycle falls exactly on the thresholdValue', () => {
    beforeEach(() => {
      cycles = [
        { cycle: 1, fluorescence: 0 },
        { cycle: 2, fluorescence: 104 },
        { cycle: 3, fluorescence: 5000 },
      ];
    });

    it('returns that integer cycle', () => {
      const thresholdCycle = wellUtils.getThresholdCycle(cycles);
      expect(thresholdCycle).to.equal(2);
    });
  });

  describe('when thresholdCycle is in between cycles', () => {
    beforeEach(() => {
      cycles = [
        { cycle: 1, fluorescence: 0 },
        { cycle: 2, fluorescence: 100 },
        { cycle: 3, fluorescence: 5000 },
      ];
    });

    it('does a simple linear interpolation between two points', () => {
      const thresholdCycle = wellUtils.getThresholdCycle(cycles);
      expect(thresholdCycle).to.equal(2.0008163265306123);
    });
  });
});
