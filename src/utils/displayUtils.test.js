import { expect } from 'chai';
import * as displayUtils from './displayUtils';

/* eslint-env jest */
describe('getLetterIndex', () => {
  it('works for one letter', () => {
    const letterIndex = displayUtils.getLetterIndex(16);

    expect(letterIndex).to.equal('Q');
  });

  it('works for two letters', () => {
    expect(displayUtils.getLetterIndex(26)).to.equal('AA');
    expect(displayUtils.getLetterIndex(27)).to.equal('AB');
    expect(displayUtils.getLetterIndex(42)).to.equal('AQ');
    expect(displayUtils.getLetterIndex(52)).to.equal('BA');
    expect(displayUtils.getLetterIndex(26 * 17)).to.equal('QA');
  });

  it('works for many letters', () => {
    expect(displayUtils.getLetterIndex(27 * 26)).to.equal('AAA');
  });
});

describe('interpolate', () => {
  it('correctly interpolates between various points', () => {
    const pointResult1 = displayUtils.interpolate(
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1 },
      0.5,
    );
    expect(pointResult1).to.have.property('x', 0.5);
    expect(pointResult1).to.have.property('y', 0.5);
    expect(pointResult1).to.have.property('z', 0.5);

    const pointResult2 = displayUtils.interpolate(
      { x: 0, y: 0, z: 0 },
      { x: 2, y: 2, z: 2 },
      0.25,
    );
    expect(pointResult2).to.have.property('x', 0.5);
    expect(pointResult2).to.have.property('y', 0.5);
    expect(pointResult2).to.have.property('z', 0.5);

    const pointResult3 = displayUtils.interpolate(
      { x: 1, y: 1, z: 1 },
      { x: 5, y: 5, z: 5 },
      0.75,
    );
    expect(pointResult3).to.have.property('x', 4);
    expect(pointResult3).to.have.property('y', 4);
    expect(pointResult3).to.have.property('z', 4);

    const pointResult4 = displayUtils.interpolate(
      { x: 1, y: 2, z: 3 },
      { x: 10, y: 9, z: 8 },
      0.314,
    );
    expect(pointResult4).to.have.property('x', 3.826);
    expect(pointResult4).to.have.property('y', 4.198);
    expect(pointResult4).to.have.property('z', 4.57);

    const pointResult5 = displayUtils.interpolate(
      { x: 1, y: -3, z: 3 },
      { x: -10, y: 8, z: -8 },
      0.888,
    );
    expect(pointResult5).to.have.property('x', -8.768);
    expect(pointResult5).to.have.property('y', 6.768000000000001);
    expect(pointResult5).to.have.property('z', -6.768000000000001);
  });
});
