export default {
  data() {
    return {
      isActiveProposalsLoading: false,
      proposals: [],
    };
  },
  methods: {
    async $_getActiveProposals() {
      let lowerBound = 'active';
      const upperBound = lowerBound;
      let response = null;
      const proposalsTable = 'proposals';
      const result = [];
      const indexPosition = 2; // status

      try {
        this.isActiveProposalsLoading = true;
        do {
          /* eslint-disable */
          response = await this.$independentEosApi
            .getTableRows(
              proposalsTable,
              this.$constants.CONTRACT_NAME,
              this.$constants.CONTRACT_NAME,
              lowerBound,
              upperBound,
              indexPosition,
            );
          /* eslint-enable */
          result.push(...response.rows);
          lowerBound = response.next_key;
        } while (response.more);

        if (!result || !result.length) {
          this.proposals = [];
          return [];
        }

        this.proposals = this.$helpers.copyDeep(result);
        return this.proposals;
      } catch (e) {
        console.error('$_getActiveProposals', e);
        this.$errorsHandler.handleError(e);
        return [];
      } finally {
        this.isActiveProposalsLoading = false;
      }
    },
  },
};
