import { mapGetters, mapActions } from 'vuex';
import ActionType from '@/store/constants';

export default {
  data() {
    return {
      isProducersLoading: false,
      producers: [],
    };
  },
  computed: {
    ...mapGetters('userService', {
      getAccountName: 'getAccountName',
    }),
  },
  methods: {
    ...mapActions('userService', [
      ActionType.SET_IS_BP,
    ]),
    async $_getProducers() {
      let lowerBound = '';
      let response = null;
      const producersTable = 'producers';
      const result = [];
      const indexPosition = 1;

      try {
        this.isProducersLoading = true;
        do {
          /* eslint-disable */
          response = await this.$independentEosApi.getTableRows(
              producersTable,
              'eosio',
              'eosio',
              lowerBound,
            null,
            indexPosition,
            );
          /* eslint-enable */
          result.push(...response.rows);
          lowerBound = response.next_key;
        } while (response.more);

        if (!result || !result.length) {
          return [];
        }

        this.producers = this.$helpers.copyDeep(result);
        return this.producers;
      } catch (e) {
        console.error('$_getProducers', e);
        this.$errorsHandler.handleError(e);
        return [];
      } finally {
        this.isProducersLoading = false;
      }
    },
  },
  watch: {
    producers() {
      if (!this.getAccountName) return;

      if (this.producers.find(e => e.owner === this.getAccountName && e.is_active)) {
        this[ActionType.SET_IS_BP](true);
      }
    },
    getAccountName() {
      if (!this.producers || !this.producers.length) return;

      if (this.producers.find(e => e.owner === this.getAccountName && e.is_active)) {
        this[ActionType.SET_IS_BP](true);
      }
    },
  },
};
