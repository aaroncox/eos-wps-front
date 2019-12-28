import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      proposal: {},
      isDraftProposalByProposalNameLoading: false,
    };
  },
  computed: {
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    async $_getDraftProposalByProposalName(proposalName) {
      const draftsTable = 'drafts';
      const indexPosition = 1;

      if (!this.getAccountName) {
        // TODO: notify about err
        throw new Error('you should login in Scatter');
      }
      if (!proposalName) {
        // TODO: notify about err
        throw new Error('you should specify proposalName');
      }
      try {
        this.isDraftProposalByProposalNameLoading = true;
        const response = await this.$independentEosApi
                                 .getTableRows(
                                   draftsTable,
                                   this.$constants.CONTRACT_NAME,
                                   this.getAccountName,
                                   proposalName,
                                   proposalName,
                                   indexPosition,
                                 );
        const result = response.rows;
        if (!result || !result.length) {
          this.proposal = {};
          return this.proposal;
        }
        this.proposal = this.$helpers.copyDeep(result[0]);
        return this.proposal;
      } catch (e) {
        console.error('$_getDraftProposalByProposalName', e);
        this.$errorsHandler.handleError(e);
        return {};
      } finally {
        this.isDraftProposalByProposalNameLoading = false;
      }
    },
  },
};
