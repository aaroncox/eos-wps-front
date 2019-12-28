export default {
  data() {
    return {
      isStateLoading: false,
      proposalState: {},
    };
  },
  methods: {
    async $_getState() {
      const stateTable = 'state';
      const indexPosition = 1;

      try {
        this.isStateLoading = true;
        const response = await this.$independentEosApi
                                .getTableRows(
                                  stateTable,
                                  this.$constants.CONTRACT_NAME,
                                  this.$constants.CONTRACT_NAME,
                                  null,
                                  null,
                                  indexPosition,
                                );
        const result = response.rows;
        if (!result || !result.length) {
          return {};
        }

        this.proposalState = this.$helpers.copyDeep(result[0]);
        return this.proposalState;
      } catch (e) {
        console.error('$_getState', e);
        this.$errorsHandler.handleError(e);
        return {};
      } finally {
        this.isStateLoading = false;
      }
    },
  },
};
