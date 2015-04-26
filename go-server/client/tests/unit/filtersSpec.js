describe('filter', function() {

  beforeEach(module('voltFilters'));

  describe('checkmark', function() {

    it('should convert boolean values to unicode checkmark or cross',
        inject(function(checkmarkFilter) {
      expect(checkmarkFilter(true)).toBe('✓');
      expect(checkmarkFilter(false)).toBe('✘');
    }));
  });
});