<template>
  <div>
    <b-table striped hover :items="resources" :fields="fields">
      <template slot="type" slot-scope="data">
        <icon class="fa-icon"
              placement="topright"
              v-b-popover.hover="TYPES.BOOK"
              v-if="data.item.type === TYPES.BOOK"
              name="book"></icon>
        <icon class="fa-icon"
              placement="topright"
              v-b-popover.hover="TYPES.CHARACTER"
              v-if="data.item.type === TYPES.CHARACTER"
              name="user"></icon>
        <icon class="fa-icon"
              placement="topright"
              v-b-popover.hover="TYPES.HOUSE"
              v-if="data.item.type === TYPES.HOUSE"
              name="archway"></icon>
      </template>

      <template slot="name" slot-scope="data">
        <div v-if="data.item.name !== ''" v-text="data.item.name"></div>
        <div v-if="data.item.aliases">
          <small>Aliases</small>
          <div v-text="data.item.aliases.join(',')"></div>
        </div>
        <div v-if="data.item.name === ''"><em>Real name is unknown</em></div>
      </template>

      <template slot="details" slot-scope="data">
        <div v-if="data.item.type === TYPES.BOOK">
          <div v-text="`ISBN: ${data.item.isbn}`"></div>
          <div v-text="`Publisher: ${data.item.publisher}`"></div>
          <div v-text="`Released: ${data.item.released}`"></div>
        </div>
        <div v-if="data.item.type === TYPES.CHARACTER">
          <div v-if="data.item.culture !== ''" v-text="`Culture: ${data.item.culture}`"></div>
          <div v-if="data.item.died === ''">Alive</div>
          <div v-if="data.item.died !== ''" v-text="`Died: ${data.item.died}`"></div>
        </div>
        <div v-if="data.item.type === TYPES.HOUSE">
          <div v-if="data.item.region !== ''" v-text="`Region: ${data.item.region}`"></div>
          <div v-if="data.item.words !== ''" v-text="`Words: ${data.item.words}`"></div>
        </div>
      </template>

      <template slot="link" slot-scope="data">
        <b-button
          variant="outline-secondary"
          :to="{ name: 'resource-details', params: { type: data.item.type, id: data.item.id } }">
          More
        </b-button>
      </template>
    </b-table>
    <b-alert :show="resources.length === 0" variant="warning">No data to show.</b-alert>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { TYPES } from '@/api';

export default {
  name: 'ResourceTable',
  data() {
    return {
      search: '',
      TYPES,
      fields: [
        { key: 'type', sortable: true },
        { key: 'name', sortable: true },
        { key: 'details', sortable: true },
        { key: 'link', sortable: false, label: '' },
      ],
    };
  },
  computed: {
    ...mapGetters([
      'resources',
    ]),
  },
};
</script>
