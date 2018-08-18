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
