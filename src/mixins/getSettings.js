export default {
  data() {
    return {
      isSettingsLoading: false,
      proposalsSettings: {},
    };
  },
  methods: {
    async $_getSettings() {
      const settingsTable = 'settings';
      const indexPosition = 1;

      try {
        this.isSettingsLoading = true;
        const response = await this.$independentEosApi
                                .getTableRows(
                                  settingsTable,
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

        this.proposalsSettings = this.$helpers.copyDeep(result[0]);
        return this.proposalsSettings;
      } catch (e) {
        console.error('$_getSettings', e);
        this.$errorsHandler.handleError(e);
        return {};
      } finally {
        this.isSettingsLoading = false;
      }
    },
  },
};
